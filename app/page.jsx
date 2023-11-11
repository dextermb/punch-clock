'use client';

import { useCallback, useMemo } from 'react';
import { uid } from 'uid';
import dayjs from 'dayjs';

import { useDatabase } from '~/hooks/use-database.js';
import { useMounted } from '~/hooks/use-mounted.js';

import CalendarCheck from './calendar-check.jsx';
import CalendarTimer from './calendar-timer.jsx';
import Spinner from './spinner.jsx';

import Row from './row.jsx';

export default function Page () {
  const [data, { set, remove }] = useDatabase();
  const mounted = useMounted();

  const latest = useMemo(() => data[0]?.value, [data]);
  const lastAction = useMemo(() => latest?.action ?? 'check-out', [latest]);

  const push = useCallback(() => {
    const value = {
      action: lastAction === 'check-out' ? 'check-in' : 'check-out',
      diff: null,
      when: (new Date()).toISOString(),
    };

    if (latest && value.action === 'check-out') {
      const prev = dayjs(value.when);

      value.diff = prev.diff(latest.when, 'h', true).toFixed(2).padStart(5, '0');
    }

    set(uid(), value);
  }, [latest, lastAction, set]);

  const pop = (id) => {
    remove(id);
  };

  return (
    <>
      <main className="w-full max-w-screen-sm p-8 pb-24">
        <div>
          <ul>
            {mounted && (
              <>
                {data.map((row, index) => (
                  <Row
                    key={row.id}
                    row={row}
                    index={index}
                    onRemove={pop}
                  />
                ))}
                {!data.length && (
                  <li className="flex animate-fade-in items-center gap-2">
                    <CalendarTimer />
                    <p>There&apos;s nothing here</p>
                  </li>
                )}
              </>
            )}
            {!mounted && (
              <li className="flex animate-fade-in items-center gap-2">
                <Spinner className="animate-spin" />
                <p>Loading...</p>
              </li>
            )}
          </ul>
        </div>
      </main>
      {mounted && (
        <div className="fixed bottom-0 left-0 w-full bg-gradient-to-b from-transparent to-white to-90% p-8">
          <div className="flex justify-end">
            <button
              className="animate-fade-grow rounded-full bg-white p-2 shadow ring-1 ring-primary/50"
              type="button"
              onClick={push}
            >
              {lastAction === 'check-out' ? <CalendarTimer /> : <CalendarCheck />}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
