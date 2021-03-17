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

# Import
import random
from copy import deepcopy
from tic_tac_toe import *
from Utility import min_val, max_val
from math import exp

# Constants
INITIAL_LR = 0.9


class Player:
    PLAYER_TYPE = "RL"
    exploration_rate = 0.3
    learning_rate = 0.9
    discount_factor = 0.8

    def __init__(self, symbol):
        assert symbol in ["x", "y"], "Symbol has to be 'x' or  'y'"
        self.symbol = symbol
        self.previous_states = []
        self.Q = {}  # Q[s,a] = Q[s'] where s' = s after action a

    def nextAction(self, board):
        """

        :rtype: list
        :type board: tic_tac_toe
        """
        actions = board.get_action()
        if random.uniform(0, 1) < self.exploration_rate:
            """
            Explore: select a random action
            """
            action = random.choice(actions)
        else:
            """
            Exploit: select the action with max value (future reward)
            """
            values = []
            for pos_action in actions:
                temp = deepcopy(board)
                index = temp.results(pos_action, self.symbol)
                index = str(index)
                value = 0 if self.Q.get(index) is None else self.Q.get(index)
                values.append(value)

            max_val = max(values)

            index = [i for i, x in enumerate(values) if x == max_val]
            board.best_actions = [actions[i] for i in index]
            # print([actions[i] for i in index])
            # print(values)
            rand_i = random.choice(index)
            action = board.best_action = actions[rand_i]

        return action

    def rewards(self, board):
        """
        At the end of the game we go back and reward the actions
        :type board: tic_tac_toe
        """
        winner = board.utility()
        if (winner == 1 and self.symbol == "x") or (winner == -1 and self.symbol == "y"):
            self.propagate_reward(1)
            # reward 1 : win
        elif (winner == -1 and self.symbol == "x") or (winner == 1 and self.symbol == "y"):
            # reward -1 : loss
            self.propagate_reward(-1)
        else:
            self.propagate_reward(0)
            # reward 0 : tie

    def propagate_reward(self, reward):
        self.Q[self.previous_states[-1]] = reward
        # reward player: 1
        for j in range(len(self.previous_states) - 2, -1, -1):
            i = self.previous_states[j]
            if self.Q.get(i) is None:
                self.Q[i] = 0
            self.Q[i] = self.Q[i] + self.learning_rate * (
                    reward + self.discount_factor * (self.Q[self.previous_states[j + 1]]) - self.Q[i])
            reward = self.Q[i]

    def exponential_decay(self, epoch):
        decay = 0.8
        self.learning_rate = INITIAL_LR * exp(-decay / (epoch + 1))


class MinimaxPlayer:
    PLAYER_TYPE = "Minimax"

    def __init__(self, symbol):
        assert symbol in ["x", "y"], "Symbol has to be 'x' or  'y'"
        self.symbol = symbol

    def nextAction(self, board):
        if self.symbol == "y":
            min_val(board, self.symbol)
        else:
            max_val(board, self.symbol)
        action = board.best_action

        return action

    def exponential_decay(self, epoch):
        pass


class HumanPlayer:
    PLAYER_TYPE = "Human"

    def __init__(self, symbol):
        assert symbol in ["x", "y"], "Symbol has to be 'x' or  'y'"
        self.symbol = symbol

    def nextAction(self, board):
        print("You are ", self.symbol)
        while True:
            try:
                input_action_1 = int(input("Enter row:"))
                input_action_2 = int(input("Enter column:"))
                assert input_action_1 in [1, 2, 0] and input_action_2 in [1, 2, 0]
                assert [input_action_1, input_action_2] in board.get_action()
                break
            except:
                print("Input error has to be within 0 and 2 inclusive")
        action = [input_action_1, input_action_2]
        return action

    def exponential_decay(self, epoch):
        pass


def move(player, board):
    action = player.nextAction(board)
    board.results(action, player.symbol)


