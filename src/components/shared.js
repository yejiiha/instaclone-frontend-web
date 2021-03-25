import styled from "styled-components";

export const BaseBox = styled.div`
  background-color: ${(props) => props.theme.formColor};
  border: 1px solid ${(props) => props.theme.borderColor};
  width: 100%;
`;

export const FatLink = styled.span`
  font-weight: 600;
  color: ${(props) => props.theme.darkGray};
`;

export const FatText = styled.span`
  font-weight: 600;
  color: ${(props) => props.theme.fontColor};
  cursor: pointer;
`;

export const dateConverter = (t) => {
  const timestamp = Number(t);
  const date = new Date(timestamp);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    monthNames[date.getMonth()].toUpperCase() +
    " " +
    date.getDate() +
    ", " +
    date.getFullYear()
  );
};

export const feedDateConverter = (t) => {
  const now = new Date();

  const timestamp = Number(t);
  const date = new Date(timestamp);

  const timeDiff = now.getTime() - date.getTime();

  const sec = Math.floor(timeDiff / 1000);
  const min = Math.floor(timeDiff / 1000 / 60);
  const hour = Math.floor(timeDiff / 1000 / 60 / 60);
  const day = Math.floor(timeDiff / 1000 / 60 / 60 / 24);
  const month = Math.floor(timeDiff / 1000 / 60 / 60 / 24 / 30);
  const year = Math.floor(timeDiff / 1000 / 60 / 60 / 24 / 30 / 12);

  if (year + month + day + hour + min === 0 && sec > 0) {
    if (sec === 1) {
      return `${sec} SECOND AGO`;
    } else {
      return `${sec} SECONDS AGO`;
    }
  }

  if (year + month + day + hour === 0 && min > 0) {
    if (min === 1) {
      return `${min} MINUTE AGO`;
    } else {
      return `${min} MINUTES AGO`;
    }
  }

  if (year + month + day === 0 && hour > 0) {
    if (hour === 1) {
      return `${hour} HOUR AGO`;
    } else {
      return `${hour} HOURS AGO`;
    }
  }

  if (year + month === 0 && day > 0) {
    if (day === 1) {
      return `${day} DAY AGO`;
    } else {
      return `${day} DAYS AGO`;
    }
  }

  if (year === 0 && month > 0) {
    if (month === 1) {
      return `${month} MONTH AGO`;
    } else {
      return `${month} MONTHS AGO`;
    }
  }

  if (year > 0) {
    if (year === 1) {
      return `${year} YEAR AGO`;
    } else {
      return `${year} YEARS AGO`;
    }
  }
};
