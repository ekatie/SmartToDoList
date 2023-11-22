-- Widgets table seeds here (Example)
INSERT INTO tasks (user_id, description, category, status, created_date, completed_date, priority, due_date) VALUES
(1, 'Eat at Omnom Yummy Eatz', 'food', FALSE, NOW(), NULL, TRUE, NULL),
(1, 'Watch Lord of the Rings Trilogy', 'movie', FALSE, NOW(), NULL, TRUE, NULL),
(1, 'Buy Games from Autumn Steam Sale', 'product', FALSE, NOW(), NULL, TRUE, NULL),
(2, 'Read Longest Book Ever', 'book', FALSE, NOW(), NULL, FALSE, NULL),
(2, 'Code all day', 'miscellaneous', FALSE, NOW(), NULL, TRUE, NULL),
(2, 'Eat Falafel', 'food', FALSE, NOW(), NULL, TRUE, NULL),
(3, 'Watch The Matrix', 'movie', FALSE, NOW(), NULL, FALSE, NULL),
(3, 'Buy Superman Comic', 'product', FALSE, NOW(), NULL, TRUE, NULL);


