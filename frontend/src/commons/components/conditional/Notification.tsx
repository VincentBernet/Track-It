type NotificationProps = {
	message: string;
	status: string;
};

const Notification = ({ message, status }: NotificationProps) => {
	return <div /*status={status}*/>{message}</div>;
};

export default Notification;
