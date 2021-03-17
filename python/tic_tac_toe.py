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
import numpy as np

# Constants


class tic_tac_toe:
    # win 0 means still going, win 1 means x won, win -1 means o won
    win = 0
    best_action = None
    best_actions = []

    def __init__(self, player_x, player_y, turn):
        assert turn == 1 or turn == -1, "Turn is 1 or -1"
        self.init_state()
        self.player_x = player_x
        self.player_y = player_y
        self.turn = turn

    def init_state(self):
        self.state = [[None, None, None], [None, None, None], [None, None, None]]

    def get_state(self):
        return self.state

    def set_state(self, state):
        self.state = state

    def get_action(self):
        actions = []
        for i in range(3):
            for j in range(3):
                if self.state[i][j] is None:
                    actions.append([i, j])
        return actions

    def results(self, action, player):
        assert (player == "x" and self.turn == 1) or (player == "y" and self.turn == -1), "wrong turn"
        if self.turn == 1:
            self.state[action[0]][action[1]] = "x"
            self.turn = -1
        else:
            self.state[action[0]][action[1]] = "y"
            self.turn = 1
        return self.state

    def terminal_test(self):
        win = None
        if self.state[0][0] == self.state[1][1] and self.state[0][0] == self.state[2][2] and self.state[2][2] is not None:
            win = "diagonal right"
        elif self.state[0][2] == self.state[1][1] and self.state[1][1] == self.state[2][0] and self.state[2][0] is not None:
            win = "diagonal left"
        elif None not in np.array(self.state)[:, 1] and len(np.unique(np.array(self.state)[:, 1])) == 1 and self.state[1][1] is not None:
            win = "vertical middle"
        elif None not in np.array(self.state)[1] and len(np.unique(np.array(self.state)[1])) == 1 and self.state[1][1] is not None:
            win = "horizontal middle"
        elif None not in np.array(self.state)[:, 0] and len(np.unique(np.array(self.state)[:, 0])) == 1 and self.state[0][0] is not None:
            win = "vertical left"
        elif None not in np.array(self.state)[0] and len(np.unique(np.array(self.state)[0])) == 1 and self.state[0][0] is not None:
            win = "horizontal top"
        elif None not in np.array(self.state)[:, 2] and len(np.unique(np.array(self.state)[:, 2])) == 1 and self.state[2][2] is not None:
            win = "vertical right"
        elif None not in np.array(self.state)[2] and len(np.unique(np.array(self.state)[2])) == 1 and self.state[2][2] is not None:
            win = "horizontal bottom"
        if win is None :
            for i in self.state:
                if None in i:
                    win = None
                    break
                win = "Draw"
        return win

    def utility(self):
        win = self.terminal_test()
        if win is not None:
            if win is "Draw":
                ut = 0
            elif win.endswith("middle") or win.startswith("diagonal"):
                if self.state[1][1] == "x":
                    ut = 1
                else:
                    ut = -1
            elif win.endswith("top") or win.endswith("left"):
                if self.state[0][0] == "x":
                    ut = 1
                else:
                    ut = -1
            else:
                if self.state[2][2] == "x":
                    ut = 1
                else:
                    ut = -1
        else:
            ut = 0
        self.win = ut
        return ut

