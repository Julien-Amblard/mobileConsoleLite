import React from "react"
import dispatchComponent from "@Components/types/dispatch"
import "./logItem.scss"

const LogItem = ({log}) => {
	return (
		<div className="logItem">
			{dispatchComponent(log)}
		</div>
	)
}
export default LogItem