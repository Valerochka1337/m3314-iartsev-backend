
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('scheduleForm');
    const scheduleResult = document.getElementById('scheduleResult');

    const savedScheduleData = JSON.parse(localStorage.getItem('scheduleData'));
    if (savedScheduleData) {
        document.getElementById('days').value = savedScheduleData.days;
        document.getElementById('lessons').value = savedScheduleData.lessons;
        document.getElementById('language').value = savedScheduleData.language;
        if (savedScheduleData.schedule) {
            generateSchedule(savedScheduleData.days, savedScheduleData.lessons, savedScheduleData.language, savedScheduleData.schedule);
        }
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const days = document.getElementById('days').value;
        const lessons = document.getElementById('lessons').value;
        const language = document.getElementById('language').value;

        const scheduleData = { days, lessons, language };
        localStorage.setItem('scheduleData', JSON.stringify(scheduleData));

        generateSchedule(days, lessons, language);
    });


    function generateSchedule(days, lessons, language, existingScheduleData = null) {
        const fragment = document.createDocumentFragment();

        const heading = document.createElement('h4');
        heading.textContent = `Schedule for ${days}-day week`;
        fragment.appendChild(heading);

        const table = document.createElement('table');
        const headerRow = document.createElement('tr');
        const dayHeader = document.createElement('th');
        dayHeader.textContent = 'Day';
        const lessonsHeader = document.createElement('th');
        lessonsHeader.textContent = 'Lessons';

        headerRow.appendChild(dayHeader);
        headerRow.appendChild(lessonsHeader);
        table.appendChild(headerRow);

        const weekDays = language === 'ru' ?
            ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'] :
            ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        const scheduleData = existingScheduleData || Array.from({length: days}, () => Array.from({length: lessons}, (_, j) => language === 'ru' ? `Занятие ${j + 1}` : `Activity ${j + 1}`));

        for (let i = 0; i < days; i++) {
            const row = document.createElement('tr');
            const dayCell = document.createElement('td');
            dayCell.textContent = weekDays[i];
            row.appendChild(dayCell);

            const lessonsCell = document.createElement('td');
            for (let j = 0; j < lessons; j++) {
                const lessonDiv = document.createElement('div');
                lessonDiv.contentEditable = true;
                lessonDiv.className = 'editable';
                lessonDiv.dataset.day = i.toString();
                lessonDiv.dataset.lesson = j.toString();
                lessonDiv.textContent = scheduleData[i][j];
                lessonsCell.appendChild(lessonDiv);
            }
            row.appendChild(lessonsCell);
            table.appendChild(row);
        }

        fragment.appendChild(table);

        scheduleResult.innerHTML = '';
        scheduleResult.appendChild(fragment);

        const editableElements = document.querySelectorAll('.editable');
        editableElements.forEach(el => {
            el.addEventListener('input', function() {
                const dayIndex = el.getAttribute('data-day');
                const lessonIndex = el.getAttribute('data-lesson');
                scheduleData[dayIndex][lessonIndex] = el.innerText;
                localStorage.setItem('scheduleData', JSON.stringify({
                    days: days,
                    lessons: lessons,
                    language: language,
                    schedule: scheduleData
                }));
            });
        });
    }
});
