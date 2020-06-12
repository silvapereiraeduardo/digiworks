import React from 'react';
import Header from '../../components/header';
import FeedbackWrapper from '../../components/feedback-wrapper';
import Filters from '../../components/filters';
import Button from '../../components/button';
import TasksList from '../../components/tasks-list';
import Footer from '../../components/footer';
import Loading from '../../components/loading';

const DashboardPage = () => {
  return (
    <>
      <Loading active={false} />
      <Header title="DigiWorks" />
      <FeedbackWrapper />
      <Filters />
      <Button onClick={() => {}} type="button">
        Clique aqui para adicionar seus registros do Toggl no Jira
      </Button>
      <TasksList />
      <Footer />
    </>
  );
};

export default DashboardPage;
