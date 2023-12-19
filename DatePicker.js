const DatePickerType = {
    Date: { format: "mm-dd-yyyy", view: "days" },
    Month: { format: "mm-dd-yyyy", view: "months" }
};

const RangePickerType = {
    Start: 0,
    End: 1
}

const DatePickerLimitType = {
    DefaultMin: new Date('01-01-2015'),
    DefaultMax: new Date('01-01-2080'),
    Today: new Date(),
    NextMonth: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1)
}

const RangeLimitType = {
    Days: 0,
    Months: 1
}

const DefaultValueType = {
    Min: 'setStartDate',
    Max: 'setEndDate'
}

// --- Options ---
// minMonthRangeLimit: Limits how many months from today can be selected for the start date. (i.e. 12 if a start date must be within the next 12 months)
// maxMonthRangeLimit: Limits how many months from today can be selected for the end date.

// --- Docs ---
// https://bootstrap-datepicker.readthedocs.io/en/latest/

/**
 * DatePicker Utility powered by Boostrap Datepicker v1.10
 * Handles a single date picker, or a range.
 */
class FullsteamDatePicker {
    obj;
    type;
    locale;

    min = [];
    max = [];

    linked = false;
    pickers = [];
    limitType;

    /**
     * @param {string} startDate - (required) The ID of the first element in a date range.
     * @param {string} endDate - (optional) The ID of the first element in a date range.
     * @param {DatePickerType} type - (Date or Month) If not included, defaults to Date.
     * @param {DatePickerLimitType} limitType - (optional) Enum options documented above.
     */
    constructor(startDate, endDate, type, locale = 'en-US',) {
        this.obj = this;
        this.type = type ?? DatePickerType.Date;
        this.locale = locale;

        // Add each picker (Current Max: 2) to the pickers array.
        this.pickers.push({ 
            id: startDate, 
            element: document.getElementById(startDate), 
            defaultMinDate: DatePickerLimitType.DefaultMin, 
            defaultMaxDate: DatePickerLimitType.DefaultMax  
        });

        if (document.getElementById(endDate)) {
            this.pickers.push({ 
                id: endDate, 
                element: document.getElementById(endDate), 
                defaultMinDate: DatePickerLimitType.DefaultMin,
                defaultMaxDate: DatePickerLimitType.DefaultMax  
            });
            this.linked = true;
        }

        for (let i = 0; i < this.pickers.length; i++) {
            var e = this.pickers[i];
            e.element.type = "text";
            e.element.linked = Math.abs(1 - i);
            e.element.addEventListener('keydown', function (e) { e.preventDefault(); });

            e.dp = $(e.element).datepicker({
                clearBtn: true,
                format: this.type.format,
                startDate: e.defaultMinDate,
                endDate: e.defaultMaxDate,
                startView: this.type.view,
                minViewMode: this.type.view,
                //locale: this.locale
            });
        }

        if (this.linked) {
            var pickers = this.pickers;
            var methods = ['setStartDate', 'setEndDate'];

            for (let i = 0; i < this.pickers.length; i++) {
                var e = this.pickers[i];
                
                var obj = this;
                $(pickers[i].element).datepicker()
                    .on("changeDate", function (el) {
                        var link = pickers[el.currentTarget.linked];
                        $(link.element).datepicker(methods[Math.abs(1 - el.currentTarget.linked)], el.date);
                    });

                $(pickers[i].element).datepicker()
                    .on("clearDate", function (el) {
                        var link = pickers[el.currentTarget.linked];

                        $(link.element).datepicker(methods[0], link.defaultMinDate);
                        $(link.element).datepicker(methods[1], link.defaultMaxDate);
                    });
            }
        }
    }

    setValue(dateString, rangePickerType = 0) {
        if(!dateString.includes('T')){
            dateString += 'T00:00:00';
        }

        var date = new Date(dateString);
        var el = this.pickers[rangePickerType].element;

        if (this.linked) {
            var setMethods = ['setStartDate', 'setEndDate'];
            var link = el.linked;
            var linkedElement = this.pickers[link].element;

            if (rangePickerType == RangePickerType.End && $(this.pickers[RangePickerType.End].element).datepicker('getEndDate') < date) {
                $(this.pickers[RangePickerType.End].element).datepicker(setMethods[RangePickerType.End], date);
            }

            $(linkedElement).datepicker(setMethods[Math.abs(1 - link)], date);
        }

        if (el.disabled) {
            el.value = date.toLocaleDateString(this.locale, { month: 'long', year: 'numeric' }).replace(' ', '-');
        }
        
        $(el).datepicker('setDate', date);
    }

    getValue(rangePickerType = 0) {
        var el = this.pickers[rangePickerType].element;
        if (el.disabled) {
            return new Date(el.value)
        }
        return $(el).datepicker('getDate');
    }

    setDefaultMaxValue(rangeLimitType, value, rangePickerType = 0) {
        var el = this.pickers[rangePickerType].element;
        var date = null;

        switch (rangeLimitType) {
            case RangeLimitType.Days:
                date = new Date(DatePickerLimitType.Today.getFullYear(), DatePickerLimitType.Today.getMonth(), DatePickerLimitType.Today.getDate() + value);
                break;
            case RangeLimitType.Months:
                date = new Date(DatePickerLimitType.Today.getFullYear(), DatePickerLimitType.Today.getMonth() + value, DatePickerLimitType.Today.getDate());
                break;
            default:
                break;
        }

        this.pickers[rangePickerType].defaultMaxDate = date;
        $(el).datepicker(DefaultValueType.Max, date);
    }

    setDefaultMinValue(rangeLimitType, value, rangePickerType = 0) {
        var el = this.pickers[rangePickerType].element;
        var date = null;

        switch (rangeLimitType) {
            case RangeLimitType.Days:
                date = new Date(DatePickerLimitType.Today.getFullYear(), DatePickerLimitType.Today.getMonth(), DatePickerLimitType.Today.getDate() + value);
                break;
            case RangeLimitType.Months:
                date = new Date(DatePickerLimitType.Today.getFullYear(), DatePickerLimitType.Today.getMonth() + value, DatePickerLimitType.Today.getDate());
                break;
            default:
                break;
        }

        this.pickers[rangePickerType].defaultMinDate = date;
        $(el).datepicker(DefaultValueType.Min, date);
    }
}