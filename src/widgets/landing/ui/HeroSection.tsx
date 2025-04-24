import landingMain from '@/widgets/landing/assets/landing-main-large.svg';
import landingMainMedium from '@/widgets/landing/assets/landing-main-medium.svg';
import landingMainSmall from '@/widgets/landing/assets/landing-main-small.svg';
import landingBottomSmall from '@/widgets/landing/assets/landing-bottom-small.svg';
import landingBottomMedium from '@/widgets/landing/assets/landing-bottom-medium.svg';
import landingBottomLarge from '@/widgets/landing/assets/landing-bottom-large.svg';
import folder from '@/widgets/landing/assets/folder-icon.svg';
import message from '@/widgets/landing/assets/message-icon.svg';
import done from '@/widgets/landing/assets/done-icon.svg';
import repair from '@/widgets/landing/assets/repair-icon.svg';
import preview1 from '@/widgets/landing/assets/preview-1.svg';
import preview2 from '@/widgets/landing/assets/preview-2.svg';
import preview3 from '@/widgets/landing/assets/preview-3.svg';
import Image from 'next/image';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <>
      <div className="bg-background-primary relative">
        <div>
          <div className="absolute top-[55px] left-[50%] -translate-x-[50%]">
            <div className="flex items-center justify-center gap-1">
              <p className="text-2xl-sb text-text-primary text-nowrap">
                함께 만들어가는 투두 리스트
              </p>
              <Image
                src={repair}
                alt="repair"
                priority
                width={28}
                height={28}
              />
            </div>
            <p className="flex items-center justify-center text-3xl-sb bg-linear-to-r from-interaction-focus to-brand-tertiary bg-clip-text text-transparent">
              Coworkers
            </p>
          </div>

          <div className="relative">
            <Image
              src={landingMainSmall}
              alt="landing-main"
              priority
              className="w-full object-contain block md:hidden"
              width={375}
              height={640}
            />
            <Image
              src={landingMainMedium}
              alt="landing-main"
              priority
              className="w-full hidden md:block lg:hidden"
            />
            <Image
              src={landingMain}
              alt="landing-main"
              priority
              className="w-full hidden lg:block"
            />
            <div className="absolute bottom-[48px] md:bottom-[120px] left-0 right-0 px-5 max-w-[375px] mx-auto">
              <Link href="/login" passHref>
                <button className="text-lg-sb text-white bg-gradient-to-r from-interaction-focus to-brand-tertiary py-[13px] rounded-[32px] w-full cursor-pointer">
                  지금 시작하기
                </button>
              </Link>
            </div>
          </div>
        </div>

        <main className="px-4 max-w-[996px] mx-auto">
          <div className="relative p-[1px] mb-12">
            <div className="absolute inset-0 bg-gradient-to-r from-interaction-focus to-brand-tertiary rounded-[40px] shadow-[0px_0px_12px_2px_rgba(255,255,255,0.25)] backdrop-blur-[12px]"></div>
            <div className="flex flex-col items-center relative bg-background-primary rounded-[40px] px-[54px] pt-12 md:pt-[85px]">
              <div className="md:flex md:flex-row-reverse items-center md:gap-[100px] lg:gap-[193px]">
                <div className="mb-10">
                  <div className="bg-background-secondary rounded-lg p-3 mb-4 w-fit border border-[#F8FAFC1A] shadow-[0px_0px_12px_2px_rgba(255,255,255,0.25)] backdrop-blur-[12px]">
                    <Image
                      src={folder}
                      alt="folder-icon"
                      width={24}
                      height={24}
                    />
                  </div>
                  <div>
                    <p className="text-white text-2lg-m">
                      그룹으로
                      <br />할 일을 관리해요
                    </p>
                  </div>
                </div>
                <div>
                  <Image src={preview1} alt="preview-1" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center mb-12 bg-background-secondary border border-[#F8FAFC1A] rounded-[40px] pb-[52px] px-[54px]">
            <div className="md:flex md:flex-row-reverse items-center md:gap-[90px] lg:gap-[193px]">
              <div className="mb-10">
                <Image src={preview2} alt="preview-2" />
              </div>
              <div className="md:flex md:flex-col md:items-end">
                <div className="bg-background-secondary rounded-lg p-3 mb-4 w-fit border border-[#F8FAFC1A] shadow-[0px_0px_12px_2px_rgba(0,0,0,0.25)]">
                  <Image
                    src={message}
                    alt="message-icon"
                    width={24}
                    height={24}
                  />
                </div>
                <p className="text-white text-2lg-m md:text-right">
                  간단하게 맴버들을
                  <br />
                  초대해요
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center bg-[#020617] rounded-[40px] pb-[51px] px-[60px]">
            <div className="md:flex md:flex-row items-center md:gap-[90px] lg:gap-[193px]">
              <div className="mb-10">
                <Image src={preview3} alt="priview3" />
              </div>
              <div>
                <div className="bg-background-secondary rounded-lg p-3 mb-4 w-fit border border-[#F8FAFC1A] shadow-[0px_0px_12px_2px_rgba(255,255,255,0.25)] backdrop-blur-[12px]">
                  <Image src={done} alt="done-icon" width={24} height={24} />
                </div>
                <div>
                  <p className="text-white text-2lg-m">
                    할 일도 간편하게 <br />
                    체크해요
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>

        <div className="relative">
          <div className="text-center absolute top-[123px] md:top-[176px] left-[50%] -translate-x-[50%] text-nowrap">
            <p className="text-white text-2xl-sb mb-4 md:text-[40px] md:font-weight-600 md:mb-3">
              지금 바로 시작해보세요
            </p>
            <p className="text-white text-lg-m flex flex-col md:flex-row md:items-center md:gap-2 md:text-2xl-m">
              <span>팀원 모두와 같은 방향,</span>
              <span>같은 속도로 나아가는 가장 쉬운 방법</span>
            </p>
          </div>
          <Image
            src={landingBottomSmall}
            alt="landing-bottom-small"
            className="block md:hidden"
          />
          <Image
            src={landingBottomMedium}
            alt="landing-bottom-medium"
            className="w-full hidden md:block lg:hidden"
          />
          <Image
            src={landingBottomLarge}
            alt="landing-bottom-large"
            className="w-full hidden lg:block"
          />
        </div>
      </div>
    </>
  );
};

export default HeroSection;
