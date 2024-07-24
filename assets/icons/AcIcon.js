import * as React from "react"
import Svg, { Path } from "react-native-svg"
const AcIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={15}
    height={15}
    fill="none"
    {...props}
  >
    <Path
      stroke="#484849"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13.393.536H1.607A1.071 1.071 0 0 0 .536 1.607v5.357a1.071 1.071 0 0 0 1.071 1.072h11.786a1.072 1.072 0 0 0 1.071-1.072V1.607A1.072 1.072 0 0 0 13.393.536Z"
    />
    <Path
      stroke="#484849"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.786 8.036V5.893a1.072 1.072 0 0 0-1.072-1.072H4.286a1.071 1.071 0 0 0-1.072 1.072v2.143m-.535 5.357h.107a1.5 1.5 0 0 0 1.5-1.5v-1.179m8.035 2.679h-.107a1.5 1.5 0 0 1-1.5-1.5v-1.179M7.5 14.464v-3.75"
    />
  </Svg>
)
export default AcIcon
