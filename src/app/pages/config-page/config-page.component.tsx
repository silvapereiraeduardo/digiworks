import React from 'react';
import Header from '../../components/header';
import FieldsWrapper from '../../components/fields-wrapper';

const ConfigPage = () => {
  return (
    <>
      <Header title="DigiWorks (Configurações)" hideMenu />
      <div className="line">
        <div id="status"></div>
      </div>
      <div className="line"><h1 className="header">Extensão</h1></div>
      <div className="options-panel">
        <FieldsWrapper>
          <div className="field w-100">
            <label className="options">
              "Comentário padrão do trabalho" do qual será adicionado à descrição usando "-" como separador.
            </label>
            <input id="log-comment" className="w-100" />
          </div>
        </FieldsWrapper>
        <FieldsWrapper>
          <div className="field w-100">
            <label className="options">
              Texto a ser removido de todos os comentários (caso você use algum código que não precisará nos
              comentários)
            </label>
            <input id="log-comment-replace" className="w-100" />
          </div>
        </FieldsWrapper>
        <FieldsWrapper>
          <div className="field-options">
            <label>
              <input type="checkbox" id="jump-to-today"/>
              <b>&nbsp;Sempre pule a data de término para hoje em vez de lembrar a última data</b>
            </label>
          </div>
        </FieldsWrapper>
        <FieldsWrapper>
          <div className="field-options">
            <label>
              <input type="checkbox" id="show-day-total"/>
              <b>&nbsp;Somar o total de horas em cada dia</b>
            </label>
          </div>
        </FieldsWrapper>
      </div>
      <div className="line header"><h1 className="header">Toggl</h1></div>
      <div className="options-panel">
        <FieldsWrapper>
          <div className="field w-100">
            <label className="options">API Token</label>
            <input id="toggl-api-key" className="w-100" />
          </div>
        </FieldsWrapper>
      </div>
      <div className="line header"><h1 className="header">Jira</h1></div>
      <div className="options-panel">
        <FieldsWrapper>
          <div className="field w-100">
            <label className="options">E-mail do usuário</label>
            <input id="jira-user-email" className="w-100" />
          </div>
        </FieldsWrapper>
      </div>
      <div className="line">
        <button id="save">Salvar alterações</button>
      </div>
    </>
  );
};

export default ConfigPage;
