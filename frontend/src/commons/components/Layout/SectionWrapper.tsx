import { Link } from 'react-router-dom';
import { StyledSection } from '../../styles';


interface SectionWrapperProps {
    children: React.ReactNode,
    title: string,
    forcedWidth?: string,
    extra?: React.ReactNode,
    seeAllLink?: string,
    links?: {
        title: string,
        link: string,
    }[],
}

const SectionWrapper = ({ children, title, extra = <></>, seeAllLink, links, forcedWidth }: SectionWrapperProps) => (
    <StyledSection $forcedWidth={forcedWidth}>
        <div className="section__inner">
            <div className="section__top">
                <h2 className="section__heading">
                    {links && links.map((link, i) => (
                        <span key={i} className="section__breadcrumb">
                            <Link to={`/${link.link}`}>
                                {link.title}
                            </Link>
                        </span>))
                    }
                    {title && (
                        <>
                            {seeAllLink ? (
                                <Link to={seeAllLink}>{title}</Link>
                            ) : (
                                <span>{title}</span>
                            )}
                        </>
                    )}
                </h2>
                {extra}
                {seeAllLink && (
                    <Link to={seeAllLink} className="section__see-all">See All</Link>
                )}
            </div>

            {children}
        </div>
    </StyledSection >
);

export default SectionWrapper;