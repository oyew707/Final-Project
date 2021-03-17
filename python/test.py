from Utility import *
from tic_tac_toe import *
from Player import *

# Player RL
# player_x = Player("x")
# player_y = Player("y")
# player_x, player_y = train(player_1=player_x, player_2=player_y, epochs = 10000)

# Player Minimax
# player_x = MinimaxPlayer("x")
# player_y = MinimaxPlayer("y")

# Player Human
player_x = HumanPlayer("x")
player_y = HumanPlayer("y")

# Who starts
turn = -1
board = tic_tac_toe("x", "y", turn)

# Show Empty board
for i in board.state:
    print(i)

while True:
    if board.turn == 1:
        move(player_x, board)
    else:
        move(player_y, board)

    # Show board after move
    for i in board.state:
        print(i)

    print("\n\n")

    if board.terminal_test() is not None or board.terminal_test() == "Draw":
        print("Game over\nWinner is:")
        if board.utility() == 1:
            print("Player X")
        elif board.utility() == -1:
            print("Player Y")
        else:
            print("Draw")

        break


