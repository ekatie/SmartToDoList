-- tasks table seeds here (Example)
INSERT INTO tasks (user_id, category_id, description, status, created_date, completed_date, priority, due_date) VALUES
(1, 1, 'Eat at Omnom Yummy Eatz', FALSE, NOW(), NULL, TRUE, NULL),
(1, 2, 'Watch Lord of the Rings Trilogy', FALSE, NOW(), NULL, FALSE, NULL),
(1, 4, 'Buy games from Autumn Steam Sale', FALSE, NOW(), NULL, TRUE, NULL),
(2, 3, 'Read Longest Book Ever', FALSE, NOW(), NULL, TRUE, NULL),
(2, 5, 'Code all day', TRUE, NOW(), NULL, TRUE, NULL),
(2, 1, 'Eat Falafel', FALSE, NOW(), NULL, TRUE, NULL),
(3, 2, 'Watch The Matrix', FALSE, NOW(), NULL, FALSE, NULL),
(3, 4, 'Buy Superman Comic', FALSE, NOW(), NULL, FALSE, NULL),
(3, 1, 'Eat Poutine', FALSE, NOW(), NULL, TRUE, NULL);

