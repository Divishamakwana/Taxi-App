import * as React from "react"
import Svg, { Path } from "react-native-svg"
const DisableClockIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    fill="none"
    {...props}
  >
    <Path
      fill="#c7c7c7"
      d="M9 .667A8.333 8.333 0 1 1 .667 9 8.333 8.333 0 0 1 9 .667Zm0 1.666a6.667 6.667 0 1 0 0 13.334A6.667 6.667 0 0 0 9 2.333ZM9 4a.833.833 0 0 1 .827.736l.006.097v3.822l2.256 2.256a.833.833 0 0 1-1.1 1.247l-.078-.069-2.5-2.5a.833.833 0 0 1-.237-.48L8.167 9V4.833A.833.833 0 0 1 9 4Z"
    />
  </Svg>
)
export default DisableClockIcon
