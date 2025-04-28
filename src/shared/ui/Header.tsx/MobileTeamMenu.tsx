import closeIcon from '@/shared/assets/images/close-icon.svg';
import Image from 'next/image';

const MobileTeamMenu = ({ isClose }: { isClose: () => void }) => {
  return (
    <div className="w-[204px] h-screen bg-background-secondary p-4 md:hidden">
      <div className="flex justify-end mb-[35px]">
        <Image
          src={closeIcon}
          alt="닫기 버튼"
          width={24}
          height={24}
          onClick={isClose}
        />
      </div>
      <ul className="flex flex-col gap-6">
        <li className="text-md-m text-text-primary py-[3.5px]">경영관리팀</li>
        <li className="text-md-m text-text-primary py-[3.5px]">프로덕트팀</li>
        <li className="text-md-m text-text-primary py-[3.5px]">마케팅팀</li>
        <li className="text-md-m text-text-primary py-[3.5px]">콘텐츠팀</li>
        <li className="text-md-m text-text-primary py-[3.5px]">자유게시판</li>
      </ul>
    </div>
  );
};

export default MobileTeamMenu;
