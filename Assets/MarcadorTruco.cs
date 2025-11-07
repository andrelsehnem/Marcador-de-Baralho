using System;
using TMPro;
using UnityEngine;
using UnityEngine.UI;
using static System.Net.Mime.MediaTypeNames;

public class MarcadorTruco : MonoBehaviour
{
    public TextMeshProUGUI pontosTimeA;
    public TextMeshProUGUI pontosTimeB;
    public ConfirmationDialog confirmationDialog;

    private int scoreA = 0;
    private int scoreB = 0;

    public void SomarA()
    {
        if (scoreA < 12)
            scoreA++;
        AtualizarPlacar();
    }

    public void SubtrairA()
    {
        if (scoreA > 0)
            scoreA--;
        AtualizarPlacar();
    }

    public void SomarB()
    {
        if (scoreB < 12)
            scoreB++;
        AtualizarPlacar();
    }

    public void SubtrairB()
    {
        if (scoreB > 0)
            scoreB--;
        AtualizarPlacar();
    }

    public void Resetar()
    {
        GameObject gameObject = GameObject.Find("ConfirmaReset");
        scoreA = 0;
        scoreB = 0;
        AtualizarPlacar();
    }

    void AtualizarPlacar()
    {
        pontosTimeA.text = scoreA.ToString();
        pontosTimeB.text = scoreB.ToString();
    }

    public void PedirConfirmacaoReset()
    {
        if (confirmationDialog == null)
        {
            // fallback: sem diálogo, apenas resetar
            Resetar();
            return;
        }

        confirmationDialog.Show("Tem certeza que deseja zerar o placar?", (bool confirmed) =>
        {
            if (confirmed)
            {
                Resetar();
            }
            else
            {
                // opcional: fazer algo quando cancelado
                Debug.Log("Reset cancelado pelo usuário.");
            }
        });
    }


}