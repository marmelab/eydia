import React, { useState } from 'react';
import { Box } from 'ink';
import TextInput from 'ink-text-input';

const AskTitle = ({ onSubmit }) => {
    const [title, setTitle] = useState();

    const handleSubmit = () => onSubmit(title);

    return (
        <Box flexDirection="column">
            <Box>Enter your todo title:</Box>
            <TextInput
                value={title}
                onChange={setTitle}
                onSubmit={handleSubmit}
            />
        </Box>
    );
};

export default AskTitle;
