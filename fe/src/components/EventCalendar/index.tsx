import { Calendar, CalendarProps } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import PageWrapper from 'components/common/PageWrapper';
import { useEffect, useState } from 'react';
import { IEvent } from 'types/events';
import { getEvents } from 'services';

export default function EventCalendar() {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [value, setValue] = useState(() => dayjs());

  useEffect(() => {
    getEvents().then((data) => {
      if (data) {
        setEvents(data);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSelect = (newValue: Dayjs) => {
    setValue(newValue);
  };
  const dateCellRender = (value: Dayjs) => {
    const eventDates = new Set(
      events.map((event) => dayjs(event.date).format('YYYY-MM-DD'))
    );

    if (eventDates.has(value.format('YYYY-MM-DD')))
      return (
        <div
          style={{
            position: 'absolute',
            top: '-4px',
            right: '-4px',
            width: '8px',
            height: '8px',
            background: '#f50',
            borderRadius: '100%',
          }}
        />
      );
  };

  const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
    if (info.type === 'date') return dateCellRender(current);
  };

  return (
    <PageWrapper>
      <Calendar
        cellRender={cellRender}
        fullscreen={false}
        onSelect={onSelect}
        style={{ fontSize: '16px', width: '400px' }}
      />
    </PageWrapper>
  );
}
