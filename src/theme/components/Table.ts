import { tableAnatomy as parts } from '@chakra-ui/anatomy';
import type { PartsStyleObject, SystemStyleObject } from '@chakra-ui/theme-tools';

const baseStyle: PartsStyleObject<typeof parts> = {
  th: {
    textTransform: 'none',
  },
};

const variantDashboard: SystemStyleObject = {
  table: {
    position: 'relative',
    fontFamily: 'Neue Machina Regular',
  },
  td: {
    paddingBottom: '1.25rem',
    borderBottomStyle: 'dotted',
    borderBottomWidth: 2,
  },
  th: {
    borderBottom: 'none',
  },
  tr: {
    _last: {
      td: {
        opacity: 0.3,
        borderBottom: 'none',
      },
    },
  },
};

const variants = {
  simple: variantDashboard,
};

export default {
  parts: parts.keys,
  baseStyle,
  variants,
};
