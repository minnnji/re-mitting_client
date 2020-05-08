import React, { useState, useEffect } from 'react';
// import electron from 'electron';
// import Store from 'electron-store';
import { exeSync } from 'child_process';
import styled from 'styled-components';
// import fs from 'fs';
import { BigButton } from './Items/Button';
import Input from './Items/Input';

const Wrapper = styled.div`
  margin: 4em;
`;

// TO DO
// const store = new Store();
// const { app } = electron.remote;

const Main = props => {
  const { mode, user_id, name, dispatch, createNewMeetingApi, joinMeetingApi, history } = props;
  const [title, setTitle] = useState('');
  const [password, setPassword] = useState('');

  // TO DO
  // useEffect(() => {
  //   if (!fs.existSync(`${app.getPath('documents')}/magnaeNote`)) {
  //     exeSync('mkdir /magnaeNote', { cwd: app.getPath('documents') });
  //     store.set('default-path', `${app.getPath('documents')}/magnaeNote`);
  //   }
  // }, []);

  return (
    <main>
      <Wrapper>
        <h2>
          {mode === 'host'
            ? '새 회의실 만들기'
            : '회의 참여하기'}
        </h2>
        <Input
          placeholder="회의실 이름"
          defaultValue={title}
          onChange={e => setTitle(e.target.value)}
        />
        <Input
          placeholder="비밀번호"
          defaultValue={password}
          onChange={e => setPassword(e.target.value)}
        />
        {mode === 'host'
          ? (
            <BigButton onClick={async () => {
              const meetingId = await createNewMeetingApi(title, password, user_id, name, dispatch);
              history.push(`/meeting?meetingId=${meetingId}`);
            }}
            >
              완료
            </BigButton>
          )
          : (
            <BigButton onClick={async () => {
              const meeting = await joinMeetingApi(title, password, name, dispatch);
              history.push(`/meeting?meetingId=${meeting._id}`);
            }}
            >
              들어가기
            </BigButton>
          )}
      </Wrapper>
    </main>
  );
};

export default Main;
