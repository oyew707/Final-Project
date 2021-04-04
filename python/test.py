import pickle
from Player import *
from Utility import train
px = MinimaxPlayer("x")
py = MinimaxPlayer("y")

player_x = Player("x")
player_y = Player("y")

print("training")
player_x, player_y = train(player_1=player_x, player_2=player_y, epochs = 3000)
player_x, _ = train(player_1=player_x, player_2=py, epochs = 100)
_, player_y = train(player_1=px, player_2=player_y, epochs = 100)


print("Saving to pickle")
fp1 = open("player_x.pkl", "wb");
pickle.dump(player_x.Q, fp1)
fp1.close()

print("Saving to pickle II")
fp2 = open("player_y.pkl", "wb");
pickle.dump(player_y.Q, fp2)
fp2.close()


# print("Create board")
# b = create_board("n/x/o/x/n/o/n/n/x");
#
# game = tic_tac_toe("x", "y", 1)
# game.set_state(b)
#
# print("Loading pickle")
# player_x_v2 = Player("x")
# fp2 = open("player_x.pkl", "rb")
# temp_q = pickle.load(fp2)
# fp2.close()
# player_x_v2.Q = temp_q
#
# print("Is loaded same as px.Q")
# print(temp_q == player_x.Q)
#
# print("Player_x next action", player_x.nextAction(game))
# print("Player_xV2 next action", player_x_v2.nextAction(game))