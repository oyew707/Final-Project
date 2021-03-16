from minimax import *

# board = tic_tac_toe("x", "y", -1)
# done = None
# print("you are x")
#
# while done is None:
#
#     for i in board.state:
#         print(i)
#     if board.turn == 1:
#         while True:
#             try:
#                 input_action_1 = int(input("Enter row:"))
#                 input_action_2 = int(input("Enter column:"))
#                 assert input_action_1 in [1, 2, 0] and input_action_2 in [1, 2, 0]
#                 assert [input_action_1, input_action_2] in board.get_action()
#                 break
#             except:
#                 print("Input error has to be within 0 and 2 inclusive")
#         new_state = board.results([input_action_1, input_action_2], "x")
#         board.set_state(new_state)
#
#     else:
#         util = min_val(board, "y")
#         print(board.best_action, " ", util)
#         action = board.best_action
#         new_state = board.results(action, "y")
#         board.set_state(new_state)
#         ps = False
#     for i in board.state:
#         print(i)
#     print(board.terminal_test())
#     print("\n\n")
#     if board.terminal_test() is not None or board.terminal_test() == "Draw":
#         print("Game over\nWinner is", board.utility())
#         if board.utility() == 1:
#             print("Player X")
#         elif board.utility() == -1:
#             print("Player Y")
#         else:
#             print("Draw")
#
#         break

board = tic_tac_toe("x", "y", -1)
board.set_state([[None, None, None], [None, None, None], [None, None, None]])
print(max_val(board, "y"))
print(board.best_action)
print(board.best_actions)
print(board.state)

