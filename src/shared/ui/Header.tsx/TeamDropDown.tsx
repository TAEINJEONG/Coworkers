import plusIcon from '@/shared/assets/images/plus-icon.svg';
import Image from 'next/image';

const TeamDropDown = () => {
  return (
    <div className="bg-background-secondary rounded-[12px] p-4 flex flex-col gap-2 text-lg-m text-text-primary">
      <div className="flex flex-col gap-2 mb-4">
        <div className="flex items-center gap-2 py-[7px] px-[8px] hover:bg-[#334155] rounded-[8px]">
          <div className="bg-white w-8 h-8 rounded-[6px]"></div>
          <p className="font-medium block truncate max-w-[10ch]">경영관리 팀</p>
        </div>
        <div className="flex items-center gap-2 py-[7px] px-[8px] hover:bg-[#334155] rounded-[8px]">
          <div className="bg-white w-8 h-8 rounded-[6px]"></div>
          <p>프로덕트 팀</p>
        </div>
        <div className="flex items-center gap-2 py-[7px] px-[8px] hover:bg-[#334155] rounded-[8px]">
          <div className="bg-white w-8 h-8 rounded-[6px]"></div>
          <p>마케팅 팀</p>
        </div>
      </div>
      <div className="flex items-center justify-center gap-1 bg-transparent border border-white rounded-[12px] text-white py-[14px] text-lg-m">
        <Image src={plusIcon} alt="plus" width={16} height={16} />
        <button>팀 추가하기</button>
      </div>
    </div>
  );
};

export default TeamDropDown;
