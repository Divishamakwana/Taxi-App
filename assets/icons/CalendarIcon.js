import * as React from "react"
import Svg, { Path } from "react-native-svg"
const CalendarIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    fill="none"
    {...props}
  >
    <Path
      fill="#28825B"
      d="M14.833 2.333h-1.666V1.5a.833.833 0 1 0-1.667 0v.833h-5V1.5a.833.833 0 0 0-1.667 0v.833H3.167a2.5 2.5 0 0 0-2.5 2.5v10a2.5 2.5 0 0 0 2.5 2.5h11.666a2.5 2.5 0 0 0 2.5-2.5v-10a2.5 2.5 0 0 0-2.5-2.5Zm.834 12.5a.833.833 0 0 1-.834.834H3.167a.833.833 0 0 1-.834-.834V9h13.334v5.833Zm0-7.5H2.333v-2.5A.833.833 0 0 1 3.167 4h1.666v.833a.833.833 0 1 0 1.667 0V4h5v.833a.833.833 0 1 0 1.667 0V4h1.666a.833.833 0 0 1 .834.833v2.5Z"
    />
  </Svg>
)
export default CalendarIcon
