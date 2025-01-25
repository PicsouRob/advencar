import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface UserInfoProps {
    name: string;
    email: string;
}

const UserInfo: React.FC<UserInfoProps> = ({ name, email }) => {
    return (
        <>
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />

                <AvatarFallback>{name.substring(0, 2)}</AvatarFallback>
            </Avatar>

            <div className="">
                <p className="font-medium">{name}</p>
                <p className="text-xs">{email}</p>
            </div>
        </>
    );
}

export default UserInfo;