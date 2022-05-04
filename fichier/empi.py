import random
j=0
r=0

r_l=["n","n","b"]
j_l=["n","b"]
for i in range(1000000):
    fini=False
    while (not fini):
        rt=random.choice(r_l)
        jt=random.choice(j_l)

        if rt!=jt:
            fini=True
            if rt=="n":
                r+=1
            else:
                j+=1


print(j/100)



