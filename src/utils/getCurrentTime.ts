export function getCurrentTime() {
	const curDate = new Date()

	const curTime = curDate.toString().match(/\d{3}\s(.+)\sGMT/)[1]
	const curMiliseconds = (curDate.getMilliseconds() + '00').substring(0, 3)

	return `${curTime}.${curMiliseconds}`
}
