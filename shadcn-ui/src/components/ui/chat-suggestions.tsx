import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface SuggestionButton {
  text: string;
  value: string;
  icon?: React.ReactNode;
}

interface ChatSuggestionsProps {
  suggestions: SuggestionButton[];
  onSelect: (value: string) => void;
  disabled?: boolean;
  maxVisible?: number;
}

export const ChatSuggestions: React.FC<ChatSuggestionsProps> = ({
  suggestions,
  onSelect,
  disabled = false,
  maxVisible = 4
}) => {
  const [showAll, setShowAll] = React.useState(false);
  
  if (suggestions.length === 0) return null;
  
  const visibleSuggestions = showAll ? suggestions : suggestions.slice(0, maxVisible);
  const hasMore = suggestions.length > maxVisible;
  
  return (
    <div className="space-y-2 mb-4">
      <div className="flex flex-wrap gap-2">
        {visibleSuggestions.map((suggestion, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            onClick={() => onSelect(suggestion.value)}
            disabled={disabled}
            className="bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700 hover:text-blue-800 text-xs sm:text-sm px-3 py-2 h-auto whitespace-nowrap"
          >
            {suggestion.icon && <span className="mr-1">{suggestion.icon}</span>}
            {suggestion.text}
          </Button>
        ))}
      </div>
      
      {hasMore && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowAll(!showAll)}
          disabled={disabled}
          className="text-blue-600 hover:text-blue-800 text-xs p-1 h-auto"
        >
          {showAll ? (
            <>
              <ChevronUp className="w-3 h-3 mr-1" />
              Show Less
            </>
          ) : (
            <>
              <ChevronDown className="w-3 h-3 mr-1" />
              Show More ({suggestions.length - maxVisible} more)
            </>
          )}
        </Button>
      )}
    </div>
  );
};