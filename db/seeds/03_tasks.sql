INSERT INTO tasks (id, user_id, category_id, description, is_complete, created_date, completed_date, is_priority, due_date) VALUES
(1, 1, 2, 'Watch Lord of the Rings Trilogy', FALSE, NOW(), NULL, FALSE, NULL),
(2, 1, 4, 'Buy games from Autumn Steam Sale', FALSE, NOW(), NULL, TRUE, NULL),
(3, 2, 1, 'Eat Falafel', FALSE, NOW(), NULL, TRUE, NULL),
(4, 3, 2, 'Watch The Matrix', FALSE, NOW(), NULL, FALSE, NULL),
(5, 3, 4, 'Buy Superman Comic', FALSE, NOW(), NULL, FALSE, NULL),
(6, 3, 1, 'Eat Poutine', FALSE, NOW(), NULL, TRUE, NULL),
(7, 4, 1, 'Eat at Omnom Yummy Eatz', FALSE, '2023-10-31 12:34:00', NULL, TRUE, NULL),
(8, 4, 3, 'Watch They All Die at the End', FALSE, '2023-11-01 10:10:00', NULL, FALSE, NULL),
(9, 4, 2, 'Read Longest Book Ever Written', FALSE, '2023-11-12 08:08:00', NULL, TRUE, NULL),
(10, 4, 4, 'Buy Thing Always on Sale', FALSE, '2023-10-10 14:10:00', NULL, FALSE, '2023-11-30 12:00:00'),
(11, 4, 5, 'Code All Day Every Day', FALSE, '2023-10-30 12:12:00', NULL, TRUE, NULL),
(12, 4, 5, 'Thing I Already Did', TRUE, '2023-10-10 05:55:00', '2023-10-31 12:34:00', TRUE, '2023-10-31 12:34:00');