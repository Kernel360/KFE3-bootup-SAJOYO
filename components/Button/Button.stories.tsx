import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const PlusIcon = () => (
  <svg width='16' height='16' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M12 5V19M5 12H19'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

const ArrowRightIcon = () => (
  <svg width='16' height='16' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M5 12H19M19 12L12 5M19 12L12 19'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

const DownloadIcon = () => (
  <svg width='16' height='16' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M21 15V19A2 2 0 0119 21H5A2 2 0 013 19V15M7 10L12 15L17 10M12 15V3'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

const meta: Meta<typeof Button> = {
  title: 'components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'ghost', 'outline', 'danger'],
      description: '버튼의 시각적 스타일 변형',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: '버튼 크기 (모바일 최적화)',
    },
    width: {
      control: { type: 'select' },
      options: ['auto', 'full'],
      description: '버튼 너비 설정',
    },
    disabled: {
      control: 'boolean',
      description: '버튼 비활성화 상태',
    },
    loading: {
      control: 'boolean',
      description: '로딩 상태 (스피너 표시)',
    },
    children: {
      control: 'text',
      description: '버튼 내용',
    },
    onClick: {
      action: 'clicked',
      description: '클릭 이벤트 핸들러',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: '확인',
    type: "reset"
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: '취소',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: '더보기',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: '둘러보기',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: '삭제',
  },
};

// === 크기별 스토리 ===

export const Sizes: Story = {
  render: () => (
    <div className='flex flex-col gap-4 items-start'>
      <div className='space-y-2'>
        <p className='text-caption'>Small (36px)</p>
        <Button size='sm' variant='primary'>
          Small Button
        </Button>
      </div>
      <div className='space-y-2'>
        <p className='text-caption'>Medium (44px) - 권장</p>
        <Button size='md' variant='primary'>
          Medium Button
        </Button>
      </div>
      <div className='space-y-2'>
        <p className='text-caption'>Large (48px)</p>
        <Button size='lg' variant='primary'>
          Large Button
        </Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '모바일 터치에 최적화된 3가지 크기입니다. Medium(44px)이 권장 크기입니다.',
      },
    },
  },
};

// === 상태별 스토리 ===

export const States: Story = {
  render: () => (
    <div className='grid grid-cols-2 gap-4'>
      <div className='space-y-2'>
        <p className='text-caption'>기본 상태</p>
        <Button variant='primary'>확인</Button>
      </div>
      <div className='space-y-2'>
        <p className='text-caption'>비활성화</p>
        <Button variant='primary' disabled>
          확인
        </Button>
      </div>
      <div className='space-y-2'>
        <p className='text-caption'>로딩 중</p>
        <Button variant='primary' loading>
          처리중...
        </Button>
      </div>
      <div className='space-y-2'>
        <p className='text-caption'>전체 너비</p>
        <Button variant='primary' width='full'>
          전체 너비 버튼
        </Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '버튼의 다양한 상태들입니다. 로딩 상태에서는 스피너가 표시됩니다.',
      },
    },
  },
};

// === 아이콘과 함께 사용 ===

export const WithIcons: Story = {
  render: () => (
    <div className='space-y-4'>
      <div className='space-y-2'>
        <p className='text-caption'>왼쪽 아이콘</p>
        <Button variant='primary' leftIcon={<PlusIcon />}>
          추가하기
        </Button>
      </div>
      <div className='space-y-2'>
        <p className='text-caption'>오른쪽 아이콘</p>
        <Button variant='outline' rightIcon={<ArrowRightIcon />}>
          다음 단계
        </Button>
      </div>
      <div className='space-y-2'>
        <p className='text-caption'>아이콘만</p>
        <Button variant='ghost' leftIcon={<DownloadIcon />} aria-label='다운로드'>
          <span className='sr-only'>다운로드</span>
        </Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '아이콘을 포함한 버튼들입니다. 로딩 상태에서는 아이콘이 스피너로 대체됩니다.',
      },
    },
  },
};

// === 모든 변형 한번에 보기 ===

export const AllVariants: Story = {
  render: () => (
    <div className='space-y-6'>
      <div>
        <h3 className='text-h3 mb-3'>기본 상태</h3>
        <div className='flex flex-wrap gap-2'>
          <Button variant='primary'>Primary</Button>
          <Button variant='secondary'>Secondary</Button>
          <Button variant='ghost'>Ghost</Button>
          <Button variant='outline'>Outline</Button>
          <Button variant='danger'>Danger</Button>
        </div>
      </div>

      <div>
        <h3 className='text-h3 mb-3'>비활성화 상태</h3>
        <div className='flex flex-wrap gap-2'>
          <Button variant='primary' disabled>
            Primary
          </Button>
          <Button variant='secondary' disabled>
            Secondary
          </Button>
          <Button variant='ghost' disabled>
            Ghost
          </Button>
          <Button variant='outline' disabled>
            Outline
          </Button>
          <Button variant='danger' disabled>
            Danger
          </Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '모든 버튼 변형을 한번에 확인할 수 있습니다.',
      },
    },
  },
};
