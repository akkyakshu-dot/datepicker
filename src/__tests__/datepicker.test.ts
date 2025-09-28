import { Datepicker } from '../core/datepicker';
import { formatDate, isSameDay, getCalendarGrid } from '../core/utils';

describe('Datepicker Core', () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  test('should create datepicker instance', () => {
    const datepicker = new Datepicker(container);
    expect(datepicker).toBeInstanceOf(Datepicker);
    expect(datepicker.getSelectedDate()).toBeNull();
  });

  test('should initialize with options', () => {
    const initialDate = new Date(2023, 5, 15);
    const options = {
      initialDate,
      format: 'DD/MM/YYYY',
      locale: 'en-GB',
    };

    const datepicker = new Datepicker(container, options);
    expect(datepicker.getSelectedDate()).toEqual(initialDate);
    
    const retrievedOptions = datepicker.getOptions();
    expect(retrievedOptions.format).toBe('DD/MM/YYYY');
    expect(retrievedOptions.locale).toBe('en-GB');
  });

  test('should select date', () => {
    const datepicker = new Datepicker(container);
    const testDate = new Date(2023, 5, 15);
    
    datepicker.setSelectedDate(testDate);
    expect(datepicker.getSelectedDate()).toEqual(testDate);
  });

  test('should call onDateSelect callback', () => {
    const onDateSelect = jest.fn();
    const datepicker = new Datepicker(container, { onDateSelect });
    const testDate = new Date(2023, 5, 15);
    
    datepicker.setSelectedDate(testDate);
    expect(onDateSelect).toHaveBeenCalledWith(testDate);
  });

  test('should update options', () => {
    const datepicker = new Datepicker(container, { format: 'YYYY-MM-DD' });
    
    datepicker.updateOptions({ format: 'DD/MM/YYYY', locale: 'fr-FR' });
    
    const options = datepicker.getOptions();
    expect(options.format).toBe('DD/MM/YYYY');
    expect(options.locale).toBe('fr-FR');
  });

  test('should show and hide datepicker', () => {
    const datepicker = new Datepicker(container);
    
    datepicker.show();
    const element = container.querySelector('.dp-container') as HTMLElement;
    expect(element.style.display).toBe('block');
    
    datepicker.hide();
    expect(element.style.display).toBe('none');
  });

  test('should navigate to specific date', () => {
    const datepicker = new Datepicker(container);
    const targetDate = new Date(2025, 11, 25);
    
    datepicker.navigateTo(targetDate);
    // This would require inspecting the DOM for the correct month/year display
    // For now, we just ensure no errors are thrown
    expect(() => datepicker.navigateTo(targetDate)).not.toThrow();
  });

  test('should destroy datepicker', () => {
    const datepicker = new Datepicker(container);
    expect(container.querySelector('.dp-container')).toBeTruthy();
    
    datepicker.destroy();
    expect(container.querySelector('.dp-container')).toBeFalsy();
  });
});

describe('Datepicker Utils', () => {
  test('should format date correctly', () => {
    const date = new Date(2023, 5, 15); // June 15, 2023
    
    expect(formatDate(date, 'YYYY-MM-DD')).toBe('2023-06-15');
    expect(formatDate(date, 'DD/MM/YYYY')).toBe('15/06/2023');
    expect(formatDate(date, 'M/D/YYYY')).toBe('6/15/2023');
  });

  test('should check if dates are same day', () => {
    const date1 = new Date(2023, 5, 15, 10, 30);
    const date2 = new Date(2023, 5, 15, 15, 45);
    const date3 = new Date(2023, 5, 16, 10, 30);
    
    expect(isSameDay(date1, date2)).toBe(true);
    expect(isSameDay(date1, date3)).toBe(false);
  });

  test('should generate calendar grid', () => {
    const grid = getCalendarGrid(2023, 5); // June 2023
    expect(grid).toHaveLength(42); // 6 weeks × 7 days
    
    // Check that some days are from June 2023
    const juneDays = grid.filter(date => date && date.getMonth() === 5);
    expect(juneDays.length).toBe(30); // June has 30 days
  });
});