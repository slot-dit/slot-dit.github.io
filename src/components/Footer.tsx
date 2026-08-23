import { AiFillGithub, AiOutlineGoogle, AiFillLinkedin } from 'react-icons/ai';
import React from 'react';
import { useTextColors } from './ColorContext';

interface FooterProps {
    githubUrl?: string;
    googleScholarUrl?: string;
    linkedInUrl?: string;
}

const Footer: React.FC<FooterProps> = ({ githubUrl, googleScholarUrl, linkedInUrl }) => {
    const { textColor, linkColor } = useTextColors();

    return (
        <footer className="pt-8 pb-4">
            <div className="container mx-auto w-full max-w-[90%] lg:max-w-6xl flex justify-between items-center text-normal text-base">
                <div className="flex space-x-8">
                    <span className="text-gray-800">
                        Website template available on&nbsp;
                        <a href="https://github.com/maltemosbach/project-page-template" style={{color: linkColor}}>
                            <span className="align-text-top inline-flex justify-center mr-0.25">
                                <AiFillGithub size={18} />&nbsp;
                            </span>
                            <span>GitHub</span>
                        </a>
                    </span>
                </div>
                <div className="flex space-x-8">
                    {githubUrl && (
                        <a href={githubUrl} target="_blank" rel="noopener noreferrer" className={`no-underline-effect`} style={{color: linkColor}} aria-label="GitHub">
                            <AiFillGithub size={24} />
                        </a>
                    )}
                    {googleScholarUrl && (
                        <a href={googleScholarUrl} target="_blank" rel="noopener noreferrer" className={`no-underline-effect`} style={{color: linkColor}} aria-label="Google Scholar">
                            <AiOutlineGoogle size={24} />
                        </a>
                    )}
                    {linkedInUrl && (
                        <a href={linkedInUrl} target="_blank" rel="noopener noreferrer" className={`no-underline-effect`} style={{color: linkColor}} aria-label="LinkedIn">
                            <AiFillLinkedin size={24} />
                        </a>
                    )}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
