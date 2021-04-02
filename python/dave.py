"""
-------------------------------------------------------
[Program Description]
-------------------------------------------------------
Author:  Einstein Oyewole
ID:      180517070
Email:   oyew7070@mylaurier.ca
__updated__ = ""
-------------------------------------------------------
"""

# Imports
import sys
from Player import *
from Utility import train

# Constants

def create_board(board):
    """
    -------------------------------------------------------
    [Function Description]
    -------------------------------------------------------
    Parameters:
       [parameter name - parameter description (parameter type and constraints)]
    Returns:
       [return value name - return value description (return value type)]
    -------------------------------------------------------
    """
    l = board.strip().split("/")
    for j in range(len(l)):
        if l[j] == "n":
            l[j] = None
    return [l[i:i+3] for i in range(0, len(l), 3)]

#print(sys.argv)

assert len(sys.argv) == 4, "call format 'python dave.py minimax x n/x/o/x/n/o/n/n/x' "

symbol = sys.argv[2]
board = create_board(sys.argv[3])
playertype = sys.argv[1]

turn = 1 if symbol == "x" else -1
if playertype == "minimax":
    player = MinimaxPlayer(symbol)
else:
    player_x = Player("x")
    player_y = Player("y")
    if symbol == "x":
        player, _ = train(player_1=player_x, player_2=player_y, epochs = 10000)
    else:
        _, player = train(player_1=player_x, player_2=player_y, epochs=10000)


game = tic_tac_toe("x", "y", turn)
game.set_state(board)

print(player.nextAction(game))

