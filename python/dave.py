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
from Utility import train, create_board

# Constants


#print(sys.argv)
assert len(sys.argv) == 4, "call format 'python dave.py minimax x n/x/o/x/n/o/n/n/x' "

symbol = sys.argv[2]
board = create_board(sys.argv[3])
playertype = sys.argv[1]

turn = 1 if symbol == "x" else -1

if playertype == "minimax":
    player = MinimaxPlayer(symbol)
else:
    import pickle
    player = Player(symbol)
    if symbol == "x":
        fp = open("python/player_x.pkl", "rb")
        temp_q = pickle.load(fp)
        fp.close()
        player.Q = temp_q
    else:
        fp = open("python/player_y.pkl", "rb")
        temp_q = pickle.load(fp)
        fp.close()
        player.Q = temp_q

game = tic_tac_toe("x", "y", turn)
game.set_state(board)

print(player.nextAction(game))


