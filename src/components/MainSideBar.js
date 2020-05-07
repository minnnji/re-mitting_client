import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment';
import { BigButton, BigBlueFilledButton } from './Items/Button';
import ScrollBox from './Items/ScrollBox';
import theme from '../constants/theme';

const SideBarTop = styled.div`
  margin: 1.5em 0;
  text-align: center;
`;

const SideBarBottom = styled.div`
  margin: 1em 1.5em;
  height: 27em;
  float: right;
`;

const Meeting = styled.div`
  margin: 1em 0;
  padding: 1em 0;
  border-bottom: 1px dotted ${theme.COLOR_WHITE};
`;

const MainSideBar = props => {
  const { meetingList, setModeHost, setModeGuest, dispatch, detail, history } = props;

  let MeetingList;
  if (meetingList) {
    MeetingList = meetingList.map((meeting, i) => (
      <Link to={`/myMeeting?meetingId=${meeting._id}`} key={i}>
        <Meeting>
          <p>{meeting.title}</p>
          <p>
            [Host]
            {meeting.memberList[0][0]}
          </p>
          <p>
            (
            {`${moment(meeting.startTime).format('LLL')} ~ ${moment(meeting.endTime).format('LT')}`}
            )
          </p>
        </Meeting>
      </Link>
    ));
  }

  return (
    <Main-nav>
      <SideBarTop>
        <BigBlueFilledButton
          inline
          onClick={() => {
            dispatch(setModeHost());
            if (detail) history.push('/');
          }}
        >
          새 회의실 만들기
        </BigBlueFilledButton>
        <BigButton
          inline
          onClick={() => {
            dispatch(setModeGuest());
            if (detail) history.push('/');
          }}
        >
          회의 참여하기
        </BigButton>
      </SideBarTop>
      <SideBarBottom>
        <h2>나의 회의록</h2>
        {meetingList && <ScrollBox>{MeetingList}</ScrollBox>}
      </SideBarBottom>
    </Main-nav>
  );
};

export default MainSideBar;
