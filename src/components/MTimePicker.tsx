import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import timezone from "dayjs/plugin/timezone";
dayjs.extend(timezone)

type MTimePickerProps = {
    label: string
    value: Dayjs | null;
    setValue: React.Dispatch<React.SetStateAction<dayjs.Dayjs | null>>
}

export default function MTimePicker({ label, value, setValue }: MTimePickerProps) {


    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <label className="block text-slate-300 text-sm font-bold mb-2">{label} ({dayjs.tz.guess()})</label>
            <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                className="bg-white border border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={value}
                onChange={(newValue) => {
                    setValue(newValue);
                }}
            />
        </LocalizationProvider>
    );
}