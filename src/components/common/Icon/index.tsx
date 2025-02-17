import * as React from 'react';
import { SparklesIcon } from './Sparkles';
import { Logo } from './Logo';
import { HomeIcon } from './Home';
import { GraphIcon } from './Graph';
import { StackIcon } from './Stack';
import { TrendUpIcon } from './TrendUp';

interface IProps {
    icon: 'sparkles' | 'logo' | 'home' | 'graph' | 'stack' | 'trendUp';
    className?: string;
}

const ICON_MAP: Record<IProps['icon'], React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
    sparkles: SparklesIcon,
    logo: Logo,
    home: HomeIcon,
    graph: GraphIcon,
    stack: StackIcon,
    trendUp: TrendUpIcon,
};

function Icon(props: IProps) {
    const { icon, ...otherProps } = props;
    const Component = ICON_MAP[icon] || SparklesIcon; // Default to SparklesIcon

    return <Component className="size-6 text-inherit" {...otherProps} />;
}

export { Icon };
