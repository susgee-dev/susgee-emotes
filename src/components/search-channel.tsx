'use client';

import { Input } from '@heroui/input';
import { SearchIcon } from '@heroui/shared-icons';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';

import { Button } from '@/components/ui/button';

export default function SearchChannel() {
	const router = useRouter();

	const [inputValue, setInputValue] = useState('');

	const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value.trim());
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (inputValue) {
			router.push(`/${inputValue}`);
		}
	};

	return (
		<div className="flex w-full flex-col gap-4">
			<form className="flex w-full items-center space-x-2" onSubmit={handleSubmit}>
				<motion.div
					animate={{ opacity: 1, scale: 1 }}
					className="relative w-full"
					initial={{ opacity: 0, scale: 0.95 }}
					transition={{
						duration: 0.3,
						ease: 'easeInOut'
					}}
				>
					<Input
						autoComplete="off"
						color="primary"
						maxLength={25}
						minLength={1}
						name="username"
						placeholder="Enter Twitch channel name"
						radius="sm"
						startContent={<SearchIcon />}
						type="text"
						value={inputValue}
						variant="bordered"
						onChange={handleInput}
					/>
				</motion.div>
				<Button disabled={!inputValue} type="submit">
					Go
				</Button>
			</form>
		</div>
	);
}
