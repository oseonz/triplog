import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import BigCalendar from '../../components/mypage/BigCalendar';
import CalendarInfo from '../../components/mypage/CalendarInfo';
import CalendarCreate from '../../components/mypage/CalendarCreate';

function MyCalendar() {
    return (
        <MainLayout>
            <div className="flex">
                <CalendarInfo></CalendarInfo>
                <BigCalendar></BigCalendar>
                <CalendarCreate></CalendarCreate>
            </div>
        </MainLayout>
    );
}

export default MyCalendar;
