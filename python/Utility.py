import random
from copy import deepcopy
from Player import *


def max_val(board, player):
    if board.terminal_test() is not None:
        return board.utility()
    actions = board.get_action()
    ls = []
    for i in actions:
        newboard = deepcopy(board)
        newboard.results(i, player)
        next_t = "y" if player == "x" else "x"
        util = min_val(newboard, next_t)
        ls.append(util)
        max_utility = max(ls)
    index = [i for i, x in enumerate(ls) if x == max_utility]
    board.best_actions = [actions[i] for i in index]
    # print([actions[i] for i in index])
    rand_i = random.choice(index)
    board.best_action = actions[rand_i]
    return max_utility*len(index)


def min_val(board, player):
    if board.terminal_test() is not None:
        return board.utility()
    actions = board.get_action()
    ls = []
    for i in actions:
        newboard = deepcopy(board)
        newboard.results(i, player)
        next_t = "y" if player == "x" else "x"
        util = max_val(newboard, next_t)
        ls.append(util)
        min_utility = min(ls)
    index = [i for i, x in enumerate(ls) if x == min_utility]
    rand_i = random.choice(index)
    board.best_actions = [actions[i] for i in index]
    # print()
    # print(board.state)
    # print(actions)
    # print([actions[i] for i in index])
    board.best_action = actions[rand_i]
    return min_utility*len(index)

def train(player_1, player_2, epochs=500):
    assert player_1.PLAYER_TYPE == "RL" or player_1.PLAYER_TYPE == "Minimax", "Only train with RL or Minimax"
    assert player_2.PLAYER_TYPE == "RL" or player_2.PLAYER_TYPE == "Minimax", "Only train with RL or Minimax"
    turn = 1
    for j in range(epochs):
        print("Round ", j)
        board = tic_tac_toe(player_1.symbol, player_2.symbol, turn)
        while True:
            for i in board.state:
                print(i)
            actions = board.get_action()
            if board.turn == 1:  # player 1
                x_act = player_1.nextAction(board)
                new_state = board.results(x_act, player_1.symbol)
                if player_1.PLAYER_TYPE == "RL":
                    player_1.previous_states.append(str(new_state))
                    if board.terminal_test() is not None:  # i.e. game over
                        player_1.rewards(board)
                        player_1.previous_states = []
                        # print("Game over")
                        # print(new_state)
                        break
                elif board.terminal_test() is not None:
                    break
            else:
                y_act = player_2.nextAction(board)
                new_state = board.results(y_act, player_2.symbol)
                if player_2.PLAYER_TYPE == "RL":
                    player_2.previous_states.append(str(new_state))
                    if board.terminal_test() is not None:  # i.e. game over
                        player_2.rewards(board)
                        player_2.previous_states = []
                        # print("Game over")
                        # print(new_state)
                        break
                elif board.terminal_test() is not None:
                    break

        player_1.exponential_decay(j)
        player_2.exponential_decay(j)
        print("Winner is:", board.utility())
        turn *= -1
    return player_1, player_2



