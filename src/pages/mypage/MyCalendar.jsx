import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import BigCalendar from '../../components/mypage/BigCalendar';
import CalendarInfo from '../../components/mypage/CalendarInfo';

function MyCalendar() {
    return (
        <MainLayout>
            <div className="flex">
                <CalendarInfo></CalendarInfo>
                <BigCalendar></BigCalendar>
            </div>
        </MainLayout>
    );
}

export default MyCalendar;
