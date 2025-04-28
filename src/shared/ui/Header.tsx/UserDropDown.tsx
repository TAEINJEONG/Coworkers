import Link from 'next/link';

const UserDropDown = () => {
  return (
    <div className="bg-background-secondary rounded-[12px] flex flex-col text-right">
      <Link
        href="/myhistory"
        className="py-[14px] hover:bg-[#334155] rounded-[8px] pr-4 "
      >
        마이 히스토리
      </Link>
      <Link
        href="/mypage"
        className="py-[14px] hover:bg-[#334155] rounded-[8px] pr-4 "
      >
        계정 설정
      </Link>
      <Link
        href="/jointeam"
        className="py-[14px] hover:bg-[#334155] rounded-[8px] pr-4 "
      >
        팀 참여
      </Link>
      <Link
        href="/jointeam"
        className="py-[14px] hover:bg-[#334155] rounded-[8px] pr-4 "
      >
        로그아웃
      </Link>
    </div>
  );
};

export default UserDropDown;
