import { FiCopy } from "react-icons/fi"

interface MetaInfoCardProps {
    title: string;
    content: string;
    characterCount?: number;
    maxCharacters?: number;
    onCopy: () => void;
    footer?: React.ReactNode;
}

export function MetaInfoCard({ title, content, characterCount, maxCharacters, onCopy, footer }: MetaInfoCardProps) {
    return (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium text-gray-700">{title}:</h3>
                <button
                    onClick={onCopy}
                    className="text-blue-500 hover:text-blue-600 transition-colors duration-300"
                >
                    <FiCopy />
                </button>
            </div>
            <p className="bg-white p-2 rounded border border-gray-200">{content}</p>
            {characterCount !== undefined && maxCharacters !== undefined && (
                <p className="text-sm text-gray-500 mt-1">
                    {characterCount}/{maxCharacters} characters
                </p>
            )}
            {footer}
        </div>
    );
}

