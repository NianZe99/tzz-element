import { SpaceCompact } from './compact';
import { Space as InternalSpace } from './space';
export type {
  SpaceCompactProps,
  SpaceDirection,
  SpaceProps,
  SpaceSize,
} from './types';

type SpaceType = typeof InternalSpace & {
  Compact: typeof SpaceCompact;
};

const Space = InternalSpace as SpaceType;
Space.Compact = SpaceCompact;

export { Space };
