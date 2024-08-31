/* eslint-disable react/prop-types */
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import styled from "styled-components";

const StyledDatedPicker = styled.div`
  display: flex;
  justify-content: center;
  padding: 1.2rem 0;
`;

function DatesPicker({ range, onChange, disabledDates }) {
  return (
    <StyledDatedPicker>
      <DateRange
        onChange={onChange}
        ranges={range}
        disabledDates={disabledDates}
        minDate={new Date()}
        editableDateInputs={true}
        moveRangeOnFirstSelection={false}
        months={2}
        direction="horizontal"
        rangeColors={["var(--color-brand-600)"]}
      />
    </StyledDatedPicker>
  );
}

export default DatesPicker;
