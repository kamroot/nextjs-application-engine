import React from 'react';
import { isoDateToReadable } from '~/lib/functions/utils';

// Very simple component to display a date and time with the right HTML semantic elements
const DateTime = ({ datetime }) => <time dateTime={datetime}>{isoDateToReadable(datetime)}</time>;
export default DateTime;
