import Heading from "./Heading";
import { LuCopy, LuCopyCheck } from 'react-icons/lu';
import React, { useState } from "react";
import { useTextColors, hexToRgba } from './ColorContext';


const Citation: React.FC = ({}) => {
    const { textColor, linkColor } = useTextColors();
    const [copied, setCopied] = useState(false);
    const bibtex = `@inproceedings{plepi2026slotdit,
  title     = {SlotDiT: Object-Centric Representations for Diffusion Transformers},
  author    = {Plepi, Gjergj and Behnke, Sven},
  booktitle = {British Machine Vision Conference (BMVC)},
  year      = {2026}
}`;

    const backgroundColor = hexToRgba(linkColor, 0.05);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(bibtex)
            .then(() => {
                setCopied(true);
                setTimeout(() => {
                    setCopied(false);
                }, 3000);
            })
            .catch((err) => {
                console.error("Failed to copy text: ", err);
            });
    };


    return (
        <div>
            <Heading>Citation</Heading>
            <div className="relative p-6 rounded-xl bg-opacity-5 !my-0"
                 style={{backgroundColor: backgroundColor}}>
                <button className={`absolute top-0 right-0 float-right text-2xl p-1 m-3`} style={{color: linkColor}}
                        onClick={copyToClipboard}>
                    {copied ? <LuCopyCheck/> : <LuCopy/>}
                </button>
                <pre className="whitespace-pre-wrap" style={{color: textColor}}>
                    <code id="citation-bib">
                      {bibtex}
                    </code>
                </pre>

            </div>
        </div>
    );
};

export default Citation;
