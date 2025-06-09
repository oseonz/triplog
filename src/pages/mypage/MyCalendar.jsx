import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import BigCalendar from '../../components/mypage/BigCalendar';
import CalendarInfo from '../../components/mypage/CalendarInfo';
import CalendarCreate from '../../components/mypage/CalendarCreate';

function MyCalendar() {
    const [selectedCourse, setSelectedCourse] = useState(null);

    return (
        <MainLayout>
            <div className="flex">
                <CalendarInfo onCourseClick={setSelectedCourse} />
                <BigCalendar></BigCalendar>
                {selectedCourse && <CalendarCreate course={selectedCourse} />}
            </div>
        </MainLayout>
    );
}

export default MyCalendar;
