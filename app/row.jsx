import dayjs from 'dayjs';
import clsx from 'clsx';

import CalendarCross from './calendar-cross.jsx';

export default function Row ({ row, index, onRemove }) {
  return (
    <li style={{ '--animation-delay': `${index * 100}ms` }}>
      <div className="flex animate-fade-up items-center gap-4 opacity-0">
        <p className="whitespace-nowrap">{row.value.action}</p>
        {row.value.diff && (
          <p className="ml-auto truncate text-primary-muted">
            {row.value.diff} h
          </p>
        )}
        <p className={clsx('truncate', !row.value.diff && 'ml-auto')}>
          {dayjs(row.value.when).format('HH:mm DD/MM')}
        </p>
        <button
          type="button"
          disabled={index !== 0}
          className={clsx(
            'shrink-0',
            index !== 0 ? 'text-primary-muted opacity-25' : 'text-danger',
          )}
          onClick={() => onRemove(row.id)}
        >
          <CalendarCross />
        </button>
      </div>
    </li>
  );
}
