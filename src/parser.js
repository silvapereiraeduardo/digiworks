var logs = [];
var config = {};

function makeLoading(show) {
    $('#loadingBar').show();
    if (show == true) {
        $('#loadingDiv').show();
        $("#submit").attr('disabled', show);
    } else {
        $('#loadingDiv').hide();
        enableSubmitButton();
    }
    return true;
}

function enableSubmitButton() {
    $("#submit").attr('disabled', false);
}

$(document).ajaxStart(makeLoading.bind(null, true));
$(document).ajaxStop(makeLoading.bind(null, false));

String.prototype.limit = function (limit) {
    return this.length > limit ? this.substr(0, limit) + '...' : this;
}

String.prototype.toHHMMSS = function () {
    // don't forget the second param
    var secNum = parseInt(this, 10);
    var hours = Math.floor(secNum / 3600);
    var minutes = Math.floor((secNum - (hours * 3600)) / 60);
    var seconds = secNum - (hours * 3600) - (minutes * 60);
    if (hours < 10) {
        hours = '0' + hours;
    }
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    var time = hours + 'h ' + minutes + 'm ' + seconds + 's';
    return time;
}

String.prototype.toHHMM = function () {
    // don't forget the second param
    var secNum = parseInt(this, 10);
    var hours = Math.floor(secNum / 3600);
    var minutes = Math.floor((secNum - (hours * 3600)) / 60);
    if (hours < 10) {
        hours = '0' + hours;
    }
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    var time = hours + 'h ' + minutes + 'm';
    return time;
}

function convertToHH_MM(date) {
    var d = new Date(date);
    var hours = d.getHours();
    var minutes = d.getMinutes();

    if (hours < 10) {
        hours = '0' + hours;
    }
    if (minutes < 10) {
        minutes = '0' + minutes;
    }

    return `${hours}:${minutes}`;
}

String.prototype.toHH_MM = function () {
    // don't forget the second param
    var secNum = parseInt(this, 10);
    var hours = Math.floor(secNum / 3600);
    var minutes = Math.floor((secNum - (hours * 3600)) / 60);
    if (hours < 10) {
        hours = '0' + hours;
    }
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    var time = hours + ':' + minutes;
    return time;
}

String.prototype.toDDMM = function () {
    // don't forget the second param
    var d = new Date(this);
    return d.getDate() + ' ' + getMonthName(d.getMonth());
}

function addError(message) {
    $('p#error').text(message).addClass('error');
    makeLoading(false);
    setTimeout(function () {
        clearError();
    }, 5000);
}

function clearError() {
    $('p#error').text('').removeClass('error');
}

$(document).ready(function () {
    chrome.storage.sync.get({
        url: 'https://digifred.atlassian.net',
        comment: '',
        commentReplace: '',
        merge: false,
        jumpToToday: false,
        showDayTotal: true
    }, function (items) {
        config = items;
        $.ajaxSetup({
            contentType: 'application/json',
            headers: {
                'forgeme': 'true',
                'X-Atlassian-Token': 'nocheck',
                'Access-Control-Allow-Origin': '*'
            },
            xhrFields: {
                withCredentials: true
            }
        });
        //Start date;
        var startString = localStorage.getItem('toggl-to-jira.last-date');
        var startDate = !startString ? new Date() : new Date(startString);
        document.getElementById('start-picker').valueAsDate = startDate;
        $('#start-picker').on('change', fetchEntries);
        //End date;
        var endString = localStorage.getItem('toggl-to-jira.last-end-date');
        var endDate = config.jumpToToday || !endString ? new Date(Date.now() + (3600 * 24 * 1000)) : new Date(endString);
        document.getElementById('end-picker').valueAsDate = endDate;
        $('#end-picker').on('change', fetchEntries);
        //Bind submit button;
        $('#submit').on('click', submitEntries);
        //Bind the select all;
        $('#select-all-link').on('click', selectAll);
        fetchEntries();
    });
});

function submitEntries() {
    //Check if anything is checked;
    var hasChecked = false;
    $('.entry-checkbox').each(function () {
        if ($(this).is(':checked')) {
            hasChecked = true
        }
    });
    if (!hasChecked) {
        addError('Nenhum registro Toggl selecionado.');
    } else {
        clearError();
        // log time for each jira ticket
        logs.forEach(function (log) {
            if (!log.submit) {
                return false;
            } else {
                var body = JSON.stringify({
                    timeSpent: log.timeSpent,
                    comment: log.comment,
                    started: log.started
                });
                var jiraRequest = $.ajax({
                    url: config.url + '/rest/api/latest/issue/' + log.issue + '/worklog',
                    method: 'POST',
                    data: body,
                    crossDomain: true,
                    headers: {
                        "X-Atlassian-Token": "nocheck",
                    }
                });
                jiraRequest.done(function (response) {
                    $('#result-' + log.id).text('Registrado').addClass('success');
                    $('#result-' + log.id).removeClass('warning');
                    $('#result-' + log.id).removeClass('danger');
                    $('#input-' + log.id).removeAttr('checked');
                    $('#input-' + log.id).attr('data-log-submit', true);
                    $('#tr-entry-' + log.id).addClass('already-logged');
                })
                jiraRequest.fail(function (error, message) {
                    console.log(error, message);
                    var e = error.responseText || JSON.stringify(error);
                    e = JSON.parse(e);
                    errorMessage = e.errorMessages[0];
                    addError(errorMessage);
                })
            }
        });
    }
}

function selectEntry() {
    var id = this.id.split('input-')[1];
    logs.forEach(function (log) {
        if (log.id === id) {
            log.submit = this.checked;
        }
    }.bind(this));
}


function selectAll() {
    var hasChecked = false;
    $('.entry-checkbox[data-log-submit="false"]').each(function () {
        if (!$(this).is(':checked')) {
            $(this).click();
            hasChecked = true;
        }
    });
    if (!hasChecked) {
        addError('Nenhum registro Toggl selecionado.');
    }
    return false;
}

function fetchEntries() {
    clearError();
    var startDate = document.getElementById('start-picker').valueAsDate.toISOString();
    var endDate = document.getElementById('end-picker').valueAsDate.toISOString();
    localStorage.setItem('toggl-to-jira.last-date', startDate);
    localStorage.setItem('toggl-to-jira.last-end-date', endDate);
    //Make the query into Toggl;
    var dateQuery = '?start_date=' + startDate + '&end_date=' + endDate;
    //Get the api key;
    chrome.storage.sync.get({
        togglApyKey: ''
    }, function (items) {
        togglApiKey = items.togglApyKey;
        if (togglApiKey != '') {
            var togglRequest = $.ajax({
                url: 'https://www.toggl.com/api/v8/time_entries' + dateQuery,
                method: "GET",
                contentType: "application/json",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Authorization", "Basic " + btoa(togglApiKey + ":api_token"));
                }
            });
            togglRequest.fail(function (jqXHR, textStatus) {
                addError('Erro na requisição do Toggl, verifique sua chave da API do Toggl.');
            });
            togglRequest.done(function (entries) {
                logs = [];
                entries.reverse();
                //Read each entry;
                entries.forEach(function (entry) {
                    entry.description = entry.description || 'Sem descrição';
                    var issue = entry.description.split(' ')[0];
                    var togglTime = entry.duration;
                    var dateString = toJiraDateTime(entry.start);
                    var log = _.find(logs, function (log) {
                        return log.issue === issue;
                    });
                    //Merge toggl entries by ticket?
                    if (log && config.merge) {
                        log.timeSpentInt = log.timeSpentInt + togglTime;
                        log.timeSpent = log.timeSpentInt > 0 ? log.timeSpentInt.toString().toHHMM() : 'Executando';
                    } else {
                        rawComment = entry.description.substr(issue.length);
                        //Replace string if needed;
                        if (config.commentReplace != '') {
                            rawComment = rawComment.replace(config.commentReplace, '');
                        }
                        //Trim string;
                        rawComment = rawComment.trim();
                        if (config.comment != '') {
                            if (rawComment != '') {
                                logComment = rawComment + ' - ' + config.comment;
                            } else {
                                logComment = config.comment;
                            }
                        } else {
                            if (rawComment != '') {
                                logComment = rawComment;
                            } else {
                                logComment = 'Sem descrição';
                            }
                        }
                        log = {
                            id: entry.id.toString(),
                            issue: issue,
                            description: entry.description.substr(issue.length),
                            submit: (togglTime > 0),
                            timeSpentInt: togglTime,
                            timeSpent: togglTime > 0 ? togglTime.toString().toHHMM() : 'Executando',
                            comment: logComment,
                            started: dateString,
                            startTime: entry.start,
                            stopTime: entry.stop,
                        };
                        logs.push(log);
                    }
                });
                renderList();
            });
        } else {
            addError('Nenhuma chave da API Toggl encontrada.');
        }
    });
}

function toJiraDateTime(date) {
    var parsedDate = Date.parse(date);
    var jiraDate = Date.now();

    if (parsedDate) {
        jiraDate = new Date(parsedDate);
    }

    var dateString = jiraDate.toISOString();

    // var timeZone = jiraDate.getTimezoneOffset() / (-60);
    // var absTimeZone = Math.abs(timeZone);
    // var timeZoneString;
    // var sign = timeZone > 0 ? '+' : '-';
    //
    // if (absTimeZone < 10) {
    //     timeZoneString = sign + '0' + absTimeZone + '00'
    // } else {
    //     timeZoneString = sign + absTimeZone + '00'
    // }

    // dateString = dateString.replace('Z', timeZoneString);
    dateString = dateString.replace('Z', "+0000");

    return dateString;
}

function getMonthName(monthNumber) {
    var monthNames = new Array();
    monthNames[0] = 'Jan';
    monthNames[1] = 'Fev';
    monthNames[2] = 'Mar';
    monthNames[3] = 'Abr';
    monthNames[4] = 'Mai';
    monthNames[5] = 'Jun';
    monthNames[6] = 'Jul';
    monthNames[7] = 'Ago';
    monthNames[8] = 'Set';
    monthNames[9] = 'Out';
    monthNames[10] = 'Nov';
    monthNames[11] = 'Dez';
    return monthNames[monthNumber];
}

function renderList() {
    //Get al entries;
    var list = $('#toggle-entries');
    list.children().remove();
    var totalTime = 0;
    var totalTimeByDay = 0;
    var currentDay = '--';
    var todayDate = new Date(Date.now());
    var todayDateString = getMonthName(todayDate.getMonth()) + ' ' + todayDate.getDate();
    //Render each entry;
    logs.forEach(function (log) {
        //Get some values;
        var url = config.url + '/browse/' + log.issue;
        var date = new Date(log.timeSpentInt * 1000);
        //Check if this log is valid based on the issue key;
        regex = /[\w]-[\d]+/i;
        if (log.issue.match(regex)) {
            var validLog = true;
        } else {
            var validLog = false;
        }
        //Dom: Create the total time by day tr;
        if (currentDay != log.started.toDDMM()) {
            if (currentDay != '--') {
                if (config.showDayTotal) {
                    list.append(`<tr class="table-total"><td class="text-right" colspan="8">Total do Dia <b>${currentDay}: <i>${totalTimeByDay.toString().toHHMM()}</i></b></td></tr>`);
                }
            }
            currentDay = log.started.toDDMM();
            totalTimeByDay = 0;
        }
        //Dom: Start the tr;
        if (validLog) {
            var dom = '<tr id="tr-entry-' + log.id + '">';
        } else {
            var dom = '<tr id="tr-entry-' + log.id + '" class="invalid-key">';
        }
        //Dom: Checkbox;
        if (validLog) {
            if (log.timeSpentInt > 0) {
                dom += '<td><input id="input-' + log.id + '" class="entry-checkbox" type="checkbox" data-log-submit="false" data-log-date="' + log.started.toDDMM() + '" data-log-today="' + todayDateString + '" verificado/></td>';
            } else {
                dom += '<td>&nbsp;</td>';
            }
        } else {
            dom += '<td>&nbsp;</td>';
        }
        //Dom: Issue Key and link;
        if (validLog) {
            dom += '<td><a href="' + url + '" target="_blank">' + log.issue + '</a></td>';
        } else {
            dom += '<td>' + log.issue + '</td>';
        }
        //Dom: Comment;
        dom += '<td>' + log.comment.limit(50) + '</td>';
        //Dom: Date;
        dom += '<td>' + log.started.toDDMM() + '</td>';
        //Dom: Start;
        dom += '<td>' + (log.startTime ? convertToHH_MM(log.startTime) : '-') + '</td>';
        //Dom: Stop;
        dom += '<td>' + (log.stopTime ? convertToHH_MM(log.stopTime) : '-') + '</td>';
        //Duration;
        dom += '<td>' + (log.timeSpentInt > 0 ? log.timeSpentInt.toString().toHH_MM() : '--') + '</td>';
        //Dom: Status;
        if (validLog) {
            dom += '<td  id="result-' + log.id + '" class="' + (log.timeSpentInt > 0 ? 'warning' : 'danger') + '">' + (log.timeSpentInt > 0 ? 'Novo' : 'Executando') + '</td>';
        } else {
            dom += '<td  id="result-' + log.id + '" class="danger">Inválido</td>';
        }
        //Close the tr element;
        dom += '</tr>';
        //Add to the total time;
        if (validLog) {
            totalTime += (log.timeSpentInt > 0 && log.timeSpentInt) || 0;
            totalTimeByDay += (log.timeSpentInt > 0 && log.timeSpentInt) || 0;
        }
        //Append to html;
        list.append(dom);
        //Add the select entry js;
        if (log.timeSpentInt > 0) {
            $('#input-' + log.id).on('click', selectEntry);
        }
    })
    //Dom: Create the total time by day tr;
    if (config.showDayTotal) {
        list.append(`<tr class="table-total"><td class="text-right" colspan="8">Total do Dia <b>${currentDay}: <i>${totalTimeByDay.toString().toHHMM()}</i></b></td></tr>`);
    }
    //Dom: Create the total time tr;
    list.append(`<tr class="table-footer"><td class="text-right" colspan="8"><b>TOTAL: <i>${totalTime.toString().toHHMM()}</i></b></td></tr>`);
    //Uncheck todays checkboxes;
    $('.entry-checkbox').each(function () {
        if ($(this).is(':checked') && $(this).attr('data-log-today') == $(this).attr('data-log-date')) {
            $(this).click();
        }
    });
    //Check if entry was already logged based on user id;
    var usedIds = [];
    var i = 0;
    chrome.storage.sync.get({
        jiraUserEmail: ''
    }, function (items) {
        var jiraUserEmail = items.jiraUserEmail;
        if (jiraUserEmail == '') {
            addError('Nenhum e-mail de usuário do Jira encontrado.');
        } else {
            logs.forEach(function (log) {
                //Still need to add a fallback here;
                $.get(config.url + '/rest/api/latest/issue/' + log.issue + '/worklog',
                    function success(response) {
                        var worklogs = response.worklogs;
                        worklogs.forEach(function (worklog) {
                            if (usedIds.indexOf(worklog.id) == -1) {
                                var diff = Math.floor(worklog.timeSpentSeconds / 60) - Math.floor(log.timeSpentInt / 60);
                                if (
                                    // if user matches
                                    worklog.author.emailAddress == jiraUserEmail &&
                                    // if date and month matches
                                    worklog.started.toDDMM() === log.started.toDDMM() &&
                                    // if duration is within 4 minutes because JIRA is rounding worklog minutes :facepalm:
                                    diff < 4 && diff > -4
                                ) {
                                    $('#result-' + log.id).text('Registrado').addClass('success');
                                    $('#result-' + log.id).removeClass('warning');
                                    $('#result-' + log.id).removeClass('danger');
                                    $('#input-' + log.id).removeAttr('checked');
                                    $('#input-' + log.id).attr('data-log-submit', true);
                                    $('#tr-entry-' + log.id).addClass('already-logged');
                                    log.submit = false;
                                    usedIds[i] = worklog.id;
                                    i++;
                                }
                            }
                        })
                    }).fail(function () {
                    $('#result-' + log.id).text('Erro').addClass('danger');
                    $('#result-' + log.id).removeClass('warning');
                    $('#result-' + log.id).removeClass('success');
                    $('#input-' + log.id).removeAttr('checked');
                    $('#input-' + log.id).attr('data-log-submit', false);
                    addError('Erro ao carregar os logs do jira, tente novamente mais tarde.');
                });
            });
        }
        console.log(usedIds);
    });
}
