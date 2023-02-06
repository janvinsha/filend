function truncate(value: any = "200", decimals: any) {
  let digitsRightOfZero =
    value?.digits?.toString()?.length + value?.exp?.toInt32();
  let newDigitLength = decimals + digitsRightOfZero;
  let truncateLength = value?.digits?.toString()?.length - newDigitLength;
  if (truncateLength < 0) {
    return value;
  } else {
    for (let i = 0; i < truncateLength; i++) {
      value.digits = value?.digits / 10;
    }
    return value;
  }
}

export default truncate;
