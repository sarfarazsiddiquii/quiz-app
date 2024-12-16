# [
#     {
#       "question": "What is the capital of France?",
#       "options": ["London", "Berlin", "Paris", "Madrid"],
#       "correctAnswer": "Paris"
#     },
#     {
#       "question": "Which planet is known as the Red Planet?",
#       "options": ["Mars", "Jupiter", "Venus", "Saturn"],
#       "correctAnswer": "Mars"
#     },
#     {
#       "question": "What is the largest mammal in the world?",
#       "options": ["African Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
#       "correctAnswer": "Blue Whale"
#     },
#     {
#       "question": "Who painted the Mona Lisa?",
#       "options": ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Michelangelo"],
#       "correctAnswer": "Leonardo da Vinci"
#     },
#     {
#       "question": "What is the chemical symbol for gold?",
#       "options": ["Au", "Ag", "Fe", "Cu"],
#       "correctAnswer": "Au"
#     },
#     {
#       "question": "Which country is home to the kangaroo?",
#       "options": ["New Zealand", "South Africa", "Australia", "Brazil"],
#       "correctAnswer": "Australia"
#     },
#     {
#       "question": "What is the largest ocean on Earth?",
#       "options": ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
#       "correctAnswer": "Pacific Ocean"
#     },
#     {
#       "question": "Who wrote 'Romeo and Juliet'?",
#       "options": ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
#       "correctAnswer": "William Shakespeare"
#     },
#     {
#       "question": "What is the hardest natural substance on Earth?",
#       "options": ["Gold", "Iron", "Diamond", "Platinum"],
#       "correctAnswer": "Diamond"
#     },
#     {
#       "question": "Which of these is not a primary color?",
#       "options": ["Red", "Blue", "Green", "Yellow"],
#       "correctAnswer": "Green"
#     }
# ]


from django.core.management.base import BaseCommand
from quiz.models import Question

class Command(BaseCommand):
    help = 'Load questions into the database'

    def handle(self, *args, **kwargs):
        questions_data = [
            {
                "question_text": "Which is the largest ocean on Earth?",
                "option_a": "Atlantic Ocean",
                "option_b": "Indian Ocean",
                "option_c": "Arctic Ocean",
                "option_d": "Pacific Ocean",
                "correct_answer": "Pacific Ocean"
            },
            {
                "question_text": "What is the largest animal on Earth?",
                "option_a": "Blue Whale",
                "option_b": "Great White Shark",
                "option_c": "Giant Squid",
                "option_d": "Elephant",
                "correct_answer": "Blue Whale"
            },
            {
                "question_text": "Which of the following is NOT a major type of forest?",
                "option_a": "Tropical Rainforest",
                "option_b": "Temperate Deciduous Forest",
                "option_c": "Boreal Forest",
                "option_d": "Desert Forest",
                "correct_answer": "Desert Forest"
            },
            {
                "question_text": "What is the primary cause of global warming?",
                "option_a": "Volcanic Eruptions",
                "option_b": "Solar Flares",
                "option_c": "Greenhouse Gas Emissions",
                "option_d": "Ocean Currents",
                "correct_answer": "Greenhouse Gas Emissions"
            },
            {
                "question_text": "Which animal is known as the 'gentle giant' of the ocean?",
                "option_a": "Orca",
                "option_b": "Great White Shark",
                "option_c": "Whale Shark",
                "option_d": "Blue Whale",
                "correct_answer": "Whale Shark"
            },
        ]

        for data in questions_data:
            Question.objects.create(**data)

        self.stdout.write(self.style.SUCCESS('Questions have been loaded successfully'))